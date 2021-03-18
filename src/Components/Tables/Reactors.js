import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import ClearButton from "../ClearButton";
import Toolbar from "../Toolbar"

import hostPath from '../../Services/constant'

function Reactors({ isAdmin }) {
  const basePath = 'reactors';

  const defaultValues = {
    IdReactor: '',
    IdDriveTypeFK: '',
    IdMixingDeviceTypeFK: '',
    IdManufacturerFK: '',
    NominalVolume: '',
    JacketVolume: '',
    WeightWithoutLiquid: '',
    PowerOutput: '',
    RotationSpeed: '',
    HousingPressure: '',
    JacketPressure: '',
    Height: '',
    Width: '',
    ElectricMotorBrand: '',
  }

  const columnsNames = Object.keys(defaultValues).map(k => k);
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdReactor', headerName: 'IdReactor', flex: 1},
    {field: 'IdDriveTypeFK', headerName: 'IdDriveTypeFK', width: 200},
    {field: 'IdMixingDeviceTypeFK', headerName: 'IdMixingDeviceTypeFK', width: 200},
    {field: 'IdManufacturerFK', headerName: 'IdManufacturerFK', width: 200},
    {field: 'NominalVolume', headerName: 'NominalVolume', width: 200},
    {field: 'JacketVolume', headerName: 'JacketVolume', width: 200},
    {field: 'WeightWithoutLiquid', headerName: 'WeightWithoutLiquid', width: 200},
    {field: 'PowerOutput', headerName: 'PowerOutput', width: 200},
    {field: 'RotationSpeed', headerName: 'RotationSpeed', width: 200},
    {field: 'HousingPressure', headerName: 'HousingPressure', width: 200},
    {field: 'JacketPressure', headerName: 'JacketPressure', width: 200},
    {field: 'Height', headerName: 'Height', width: 200},
    {field: 'Width', headerName: 'Width', width: 200},
    {field: 'ElectricMotorBrand', headerName: 'ElectricMotorBrand', width: 200},
  ]

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
  }, [])

  useEffect(() => {
    addRows(values, columns, setRows)
  }, [values])

  const handleChange = (event, key) => {
    setSelected((prev) => { 
      return {...prev, [key]: event.target.value}})
  };

  const handleCreate = () => {
    if (Object.keys(selected).map(k => selected.k)) {
      const data = columnsNames.reduce((acc,curr)=> (acc[curr] = selected[curr],acc),{});
      axios
      .post(`${hostPath}/${basePath}/create`, data)
      .then(res => {
        console.log(res.data);
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error: ${error}`))
    }
  }

  const handleUpdate = () => {
    if (Object.keys(selected).map(k => selected.k)) {
      const data = columnsNames.reduce((acc,curr)=> (acc[curr] = selected[curr],acc),{});
      axios
      .put(`${hostPath}/${basePath}/update`, data)
      .then(res => {
        console.log(res.data);
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error: ${error}`))
    }
  }

  const handleDelete = () => {
    axios
      .put(`${hostPath}/${basePath}/delete`, { IdReactor: selected.IdReactor })
      .then(() => {
        console.log(`Row removed.`)
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error ${error}`))
  }

  return(
    <div className="table__container"> 
      <DataGrid disableColumnMenu={isAdmin} components={!isAdmin ? { Toolbar } : null} className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      {isAdmin && <form className="table__form" noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column',  width: '25vw' }}>
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <TextField label="IdDriveTypeFK" value={selected.IdDriveTypeFK} onChange={e => handleChange(e, 'IdDriveTypeFK')}/>
        <TextField label="IdMixingDeviceTypeFK" value={selected.IdMixingDeviceTypeFK} onChange={e => handleChange(e, 'IdMixingDeviceTypeFK')}/>
        <TextField label="IdManufacturerFK" value={selected.IdManufacturerFK} onChange={e => handleChange(e, 'IdManufacturerFK')}/>
        <TextField label="NominalVolume" value={selected.NominalVolume} onChange={e => handleChange(e, 'NominalVolume')}/>
        <TextField label="JacketVolume" value={selected.JacketVolume} onChange={e => handleChange(e, 'JacketVolume')}/>
        <TextField label="WeightWithoutLiquid" value={selected.WeightWithoutLiquid} onChange={e => handleChange(e, 'WeightWithoutLiquid')}/>
        <TextField label="PowerOutput" value={selected.PowerOutput} onChange={e => handleChange(e, 'PowerOutput')}/>
        <TextField label="RotationSpeed" value={selected.RotationSpeed} onChange={e => handleChange(e, 'RotationSpeed')}/>
        <TextField label="HousingPressure" value={selected.HousingPressure} onChange={e => handleChange(e, 'HousingPressure')}/>
        <TextField label="JacketPressure" value={selected.JacketPressure} onChange={e => handleChange(e, 'JacketPressure')}/>
        <TextField label="Height" value={selected.Height} onChange={e => handleChange(e, 'Height')}/>
        <TextField label="Width" value={selected.Width} onChange={e => handleChange(e, 'Width')}/>
        <TextField label="ElectricMotorBrand" value={selected.ElectricMotorBrand} onChange={e => handleChange(e, 'ElectricMotorBrand')}/>
        <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default Reactors;
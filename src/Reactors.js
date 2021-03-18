import React, {useEffect, useState} from "react";
import { fetchData, addRows } from './utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from './CrudButtons';

function Reactors() {
  const hostPath = 'http://localhost:8000';
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
    {field: 'IdDriveTypeFK', headerName: 'IdDriveTypeFK', flex: 5},
    {field: 'IdMixingDeviceTypeFK', headerName: 'IdMixingDeviceTypeFK', flex: 5},
    {field: 'IdManufacturerFK', headerName: 'IdManufacturerFK', flex: 5},
    {field: 'NominalVolume', headerName: 'NominalVolume', flex: 5},
    {field: 'JacketVolume', headerName: 'JacketVolume', flex: 5},
    {field: 'WeightWithoutLiquid', headerName: 'WeightWithoutLiquid', flex: 5},
    {field: 'PowerOutput', headerName: 'PowerOutput', flex: 5},
    {field: 'RotationSpeed', headerName: 'RotationSpeed', flex: 5},
    {field: 'HousingPressure', headerName: 'HousingPressure', flex: 5},
    {field: 'JacketPressure', headerName: 'JacketPressure', flex: 5},
    {field: 'Height', headerName: 'Height', flex: 5},
    {field: 'Width', headerName: 'Width', flex: 5},
    {field: 'ElectricMotorBrand', headerName: 'ElectricMotorBrand', flex: 5},
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
    <div style={{height: '80vh', width: '70vw'}}> 
      <DataGrid rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column',  width: '25vw' }}>
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
      </form>
    </div>
    )
}

export default Reactors;
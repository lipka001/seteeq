import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import ClearButton from "../ClearButton";
import Toolbar from "../Toolbar";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import hostPath from '../../Services/constant'

function Reactors({ isAdmin }) {
  const basePath = 'reactors';

  const defaultValues = {
    IdReactor: '',
    IdDriveTypeFK: '',
    IdMixingDeviceTypeFK: '',
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
    {field: 'IdReactor', headerName: 'ID Реактора', flex: 1},
    {field: 'IdDriveTypeFK', headerName: 'ID типа привода', width: 200},
    {field: 'IdMixingDeviceTypeFK', headerName: 'ID смешивающего устройства', width: 200},
    {field: 'NominalVolume', headerName: 'Номинальный объем, м^3', width: 200},
    {field: 'JacketVolume', headerName: 'Объем рубашки, м^3', width: 200},
    {field: 'WeightWithoutLiquid', headerName: 'Масса аппарата без жидкости, кг', width: 200},
    {field: 'PowerOutput', headerName: 'Мощность, кВт', width: 200},
    {field: 'RotationSpeed', headerName: 'Частота вращения мешалки, об/мин', width: 200},
    {field: 'HousingPressure', headerName: 'Давление в корпусе, мПа', width: 200},
    {field: 'JacketPressure', headerName: 'Давление в рубашке, мПа', width: 200},
    {field: 'Height', headerName: 'Высота аппарата, мм', width: 200},
    {field: 'Width', headerName: 'Ширина (диаметр), мм', width: 200},
    {field: 'ElectricMotorBrand', headerName: 'Марка электродвигателя', width: 200},
  ]
  const [ mixDev, setMixDev ] = useState(null);
  const [ drive, setDrive ] = useState(null);

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
    fetchData(`/mixdev/all`, setMixDev);
    fetchData(`/drive-types/all`, setDrive);
  }, [])

  useEffect(() => {
    addRows(values, columns, setRows)
  }, [values])

  const handleChange = (event, key) => {
    setSelected((prev) => { 
      return {...prev, [key]: event.target.value}})
  };

  const handleCreate = () => {
    let error = false;
    Object.keys(selected).forEach(k => { 
      if (!selected[k] && k !== "IdReactor") {
        error = true;
      }
    });

    if (!Number(selected.NominalVolume) || !Number(selected.RotationSpeed)|| !Number(selected.JacketVolume) || !Number(selected.WeightWithoutLiquid) || !Number(selected.PowerOutput) || !Number(selected.HousingPressure) || !Number(selected.JacketPressure) || !Number(selected.Height) || !Number(selected.Width)) {
      error = true;
    }

    if (!error) {
      const data = columnsNames.reduce((acc,curr)=> (acc[curr] = selected[curr],acc),{});
      axios
      .post(`${hostPath}/${basePath}/create`, data)
      .then(res => {
        console.log(res.data);
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error: ${error}`))
    } else {
      setIsError(true);
    }
  }

  const handleUpdate = () => {
    let error = false;
    Object.keys(selected).forEach(k => { 
      if (!selected[k] && k !== "IdReactor") {
        error = true;
      }
    });

    if (!Number(selected.NominalVolume) || !Number(selected.RotationSpeed)|| !Number(selected.JacketVolume) || !Number(selected.WeightWithoutLiquid) || !Number(selected.PowerOutput) || !Number(selected.HousingPressure) || !Number(selected.JacketPressure) || !Number(selected.Height) || !Number(selected.Width)) {
      error = true;
    }

    if (!error) {
      const data = columnsNames.reduce((acc,curr)=> (acc[curr] = selected[curr],acc),{});
      axios
      .put(`${hostPath}/${basePath}/update`, data)
      .then(res => {
        console.log(res.data);
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error: ${error}`))
    } else {
      setIsError(true);
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

  const [isError, setIsError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsError(false);
  };


  return(
    <div className="table__container"> 
      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Некорректно заполнены поля ввода
        </Alert>
      </Snackbar>
      <DataGrid disableColumnMenu={isAdmin} components={!isAdmin ? { Toolbar } : null} className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      {isAdmin && <form className="table__form" noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column',  width: '25vw' }}>
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <InputLabel id="IdDriveTypeFKLabel">ID типа привода</InputLabel>
        <Select
          labelId="IdDriveTypeFKLabel"
          id="IdDriveTypeFK"
          value={selected.IdDriveTypeFK}
          onChange={e => handleChange(e, 'IdDriveTypeFK')}>
            {drive && drive.map((v, index) => <MenuItem key={index} value={v.IdDriveType}>{v.NameDriveType}</MenuItem>)}
        </Select>
        <InputLabel id="IdMixingDeviceTypeFKLabel">ID смешивающего устройства</InputLabel>
        <Select
          labelId="IdMixingDeviceTypeFKLabel"
          id="IdMixingDeviceTypeFK"
          value={selected.IdMixingDeviceTypeFK}
          onChange={e => handleChange(e, 'IdMixingDeviceTypeFK')}>
            {mixDev && mixDev.map((v, index) => <MenuItem key={index} value={v.IdMixingDeviceType}>{v.MixingDeviceTypeName}</MenuItem>)}
        </Select>
        <TextField label="Номинальный объем, м^3" value={selected.NominalVolume} onChange={e => handleChange(e, 'NominalVolume')}/>
        <TextField label="Объем рубашки, м^3" value={selected.JacketVolume} onChange={e => handleChange(e, 'JacketVolume')}/>
        <TextField label="Масса аппарата без жидкости, кг" value={selected.WeightWithoutLiquid} onChange={e => handleChange(e, 'WeightWithoutLiquid')}/>
        <TextField label="Мощность, кВт" value={selected.PowerOutput} onChange={e => handleChange(e, 'PowerOutput')}/>
        <TextField label="Частота вращения мешалки, об/мин" value={selected.RotationSpeed} onChange={e => handleChange(e, 'RotationSpeed')}/>
        <TextField label="Давление в корпусе, мПа" value={selected.HousingPressure} onChange={e => handleChange(e, 'HousingPressure')}/>
        <TextField label="Давление в рубашке, мПа" value={selected.JacketPressure} onChange={e => handleChange(e, 'JacketPressure')}/>
        <TextField label="Высота аппарата, мм" value={selected.Height} onChange={e => handleChange(e, 'Height')}/>
        <TextField label="Ширина (диаметр), мм" value={selected.Width} onChange={e => handleChange(e, 'Width')}/>
        <TextField label="Марка электродвигателя" value={selected.ElectricMotorBrand} onChange={e => handleChange(e, 'ElectricMotorBrand')}/>
        <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default Reactors;
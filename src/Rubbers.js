import React, {useEffect, useState} from "react";
import { fetchData, addRows } from './utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from "./CrudButtons";

function Rubbers() {
  const hostPath = 'http://localhost:8000';
  const basePath = 'rubbers';
  const defaultValues = {
    IdRubber: '',
    IdRubberTypeFK: '',
    RubberName: '',
    Density: '',
    TensileStrength: '',
    RelativeElongation: '',
    ElectricalResistance: '',
    FireResistance: '',
    GasTightness: '',
    HeatResistance: '',
    FrostResistance: '',
    StrengthUnfilled: '',
    StrengthFilled: '',
    Hardness: '',
    Elasticity: '',
    TearResistance: '',
    WearResistance: '',
    ChemicalResistanceLight: '',
    OxidationResistance: '',
    MinOperatingTemperature: '',
    MaxOperatingTemperature: '',
  }

  const columnsNames = Object.keys(defaultValues).map(k => k);

  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdRubber', headerName: 'IdRubber', width: 100},
    {field: 'IdRubberTypeFK', headerName: 'IdRubberTypeFK', width: 100},
    {field: 'RubberName', headerName: 'RubberName', width: 200},
    {field: 'Density', headerName: 'Density', width: 200},
    {field: 'TensileStrength', headerName: 'TensileStrength', width: 200},
    {field: 'RelativeElongation', headerName: 'RelativeElongation', width: 200},
    {field: 'ElectricalResistance', headerName: 'ElectricalResistance', width: 200},
    {field: 'FireResistance', headerName: 'FireResistance', width: 200},
    {field: 'GasTightness', headerName: 'GasTightness', width: 200},
    {field: 'HeatResistance', headerName: 'HeatResistance', width: 200},
    {field: 'FrostResistance', headerName: 'FrostResistance', width: 200},
    {field: 'StrengthUnfilled', headerName: 'StrengthUnfilled', width: 200},
    {field: 'StrengthFilled', headerName: 'StrengthFilled', width: 200},
    {field: 'Hardness', headerName: 'Hardness', width: 200},
    {field: 'Elasticity', headerName: 'Elasticity', width: 200},
    {field: 'TearResistance', headerName: 'TearResistance', width: 200},
    {field: 'WearResistance', headerName: 'WearResistance', width: 200},
    {field: 'ChemicalResistanceLight', headerName: 'ChemicalResistanceLight', width: 200},
    {field: 'OxidationResistance', headerName: 'OxidationResistance', width: 200},
    {field: 'MinOperatingTemperature', headerName: 'MinOperatingTemperature', width: 200},
    {field: 'MaxOperatingTemperature', headerName: 'MaxOperatingTemperature', width: 200},
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
      .put(`${hostPath}/${basePath}/delete`, { IdRubber: selected.IdRubber })
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
        <TextField label="IdRubberTypeFK" value={selected.IdRubberTypeFK} onChange={e => handleChange(e, 'IdRubberTypeFK')}/>
        <TextField label="RubberName" value={selected.RubberName} onChange={e => handleChange(e, 'RubberName')}/>
        <TextField label="Density" value={selected.Density} onChange={e => handleChange(e, 'Density')}/>
        <TextField label="TensileStrength" value={selected.TensileStrength} onChange={e => handleChange(e, 'TensileStrength')}/>
        <TextField label="RelativeElongation" value={selected.RelativeElongation} onChange={e => handleChange(e, 'RelativeElongation')}/>
        <TextField label="ElectricalResistance" value={selected.ElectricalResistance} onChange={e => handleChange(e, 'ElectricalResistance')}/>
        <TextField label="FireResistance" value={selected.FireResistance} onChange={e => handleChange(e, 'FireResistance')}/>
        <TextField label="GasTightness" value={selected.GasTightness} onChange={e => handleChange(e, 'GasTightness')}/>
        <TextField label="HeatResistance" value={selected.HeatResistance} onChange={e => handleChange(e, 'HeatResistance')}/>
        <TextField label="FrostResistance" value={selected.FrostResistance} onChange={e => handleChange(e, 'FrostResistance')}/>
        <TextField label="StrengthUnfilled" value={selected.StrengthUnfilled} onChange={e => handleChange(e, 'StrengthUnfilled')}/>
        <TextField label="StrengthFilled" value={selected.StrengthFilled} onChange={e => handleChange(e, 'StrengthFilled')}/>
        <TextField label="Hardness" value={selected.Hardness} onChange={e => handleChange(e, 'Hardness')}/>
        <TextField label="Elasticity" value={selected.Elasticity} onChange={e => handleChange(e, 'Elasticity')}/>
        <TextField label="TearResistance" value={selected.TearResistance} onChange={e => handleChange(e, 'TearResistance')}/>
        <TextField label="WearResistance" value={selected.WearResistance} onChange={e => handleChange(e, 'WearResistance')}/>
        <TextField label="ChemicalResistanceLight" value={selected.ChemicalResistanceLight} onChange={e => handleChange(e, 'ChemicalResistanceLight')}/>
        <TextField label="OxidationResistance" value={selected.OxidationResistance} onChange={e => handleChange(e, 'OxidationResistance')}/>
        <TextField label="MinOperatingTemperature" value={selected.MinOperatingTemperature} onChange={e => handleChange(e, 'MinOperatingTemperature')}/>
        <TextField label="MaxOperatingTemperature" value={selected.MaxOperatingTemperature} onChange={e => handleChange(e, 'MaxOperatingTemperature')}/>
          <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>
    </div>
    )
}

export default Rubbers;
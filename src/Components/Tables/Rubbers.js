import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from "../CrudButtons";
import ClearButton from "../ClearButton";
import Toolbar from "../Toolbar";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import hostPath from '../../Services/constant'

function Rubbers({ isAdmin }) {
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
    {field: 'IdRubber', headerName: 'ID каучука', width: 100},
    {field: 'IdRubberTypeFK', headerName: 'Тип каучука', width: 100},
    {field: 'RubberName', headerName: 'Наименование', width: 200},
    {field: 'Density', headerName: 'Плотность, г/см^3', width: 200},
    {field: 'TensileStrength', headerName: 'Прочность при растяжении, Мпа', width: 200},
    {field: 'RelativeElongation', headerName: 'Относительное удлинение, %', width: 200},
    {field: 'ElectricalResistance', headerName: 'Электростойкость', width: 200},
    {field: 'FireResistance', headerName: 'Огнестойкость', width: 200},
    {field: 'GasTightness', headerName: 'Газонепроницаемость', width: 200},
    {field: 'HeatResistance', headerName: 'Теплостойкость', width: 200},
    {field: 'FrostResistance', headerName: 'Морозостойкость', width: 200},
    {field: 'StrengthUnfilled', headerName: 'Прочность ненаполненные, МПа', width: 200},
    {field: 'StrengthFilled', headerName: 'Прочность наполненные, МПа', width: 200},
    {field: 'Hardness', headerName: 'Твердость: По Шору «А»', width: 200},
    {field: 'Elasticity', headerName: 'Эластичность', width: 200},
    {field: 'TearResistance', headerName: 'Сопротивление раздиру', width: 200},
    {field: 'WearResistance', headerName: 'Износостойкость', width: 200},
    {field: 'ChemicalResistanceLight', headerName: 'Химстойкость к свету', width: 200},
    {field: 'OxidationResistance', headerName: 'Химстойкость к окислению', width: 200},
    {field: 'MinOperatingTemperature', headerName: 'Мин допустимая температура', width: 200},
    {field: 'MaxOperatingTemperature', headerName: 'Макс допустимая температура', width: 200},
  ]
  const [ rubTypes, setRubTypes ] = useState(null);

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
    fetchData(`/rubbers-types/all`, setRubTypes);
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
      if (!selected[k] && k !== "IdRubber") {
        error = true;
      }
    });

    if (!Number(selected.Density) || !Number(selected.TensileStrength) || !Number(selected.RelativeElongation) || !Number(selected.StrengthUnfilled) || !Number(selected.StrengthFilled) || !Number(selected.Hardness) || !Number(selected.MinOperatingTemperature) || !Number(selected.MaxOperatingTemperature)) {
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
      if (!selected[k] && k !== 'IdRubber') {
        error = true;
      }
    });

    if (!Number(selected.Density) || !Number(selected.TensileStrength) || !Number(selected.RelativeElongation) || !Number(selected.StrengthUnfilled) || !Number(selected.StrengthFilled) || !Number(selected.Hardness) || !Number(selected.MinOperatingTemperature) || !Number(selected.MaxOperatingTemperature)) {
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
      .put(`${hostPath}/${basePath}/delete`, { IdRubber: selected.IdRubber })
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
      {isAdmin && <form className="table__form" noValidate autoComplete="off" >
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <InputLabel id="IdRubberTypeFKLabel">Тип каучука</InputLabel>
        <Select
          labelId="IdRubberTypeFKLabel"
          id="IdRubberTypeFK"
          value={selected.IdRubberTypeFK}
          onChange={e => handleChange(e, 'IdRubberTypeFK')}>
            {rubTypes && rubTypes.map((v, index) => <MenuItem key={index} value={v.IdRubberType}>{v.Name}</MenuItem>)}
        </Select>
        <TextField label="Наименование" value={selected.RubberName} onChange={e => handleChange(e, 'RubberName')}/>
        <TextField label="Плотность, г/см^3" value={selected.Density} onChange={e => handleChange(e, 'Density')}/>
        <TextField label="Прочность при растяжении, Мпа" value={selected.TensileStrength} onChange={e => handleChange(e, 'TensileStrength')}/>
        <TextField label="Относительное удлинение, %" value={selected.RelativeElongation} onChange={e => handleChange(e, 'RelativeElongation')}/>
        <InputLabel id="ElectricalResistanceLabel">Электростойкость</InputLabel>
        <Select
          labelId="ElectricalResistanceLabel"
          id="ElectricalResistance"
          value={selected.ElectricalResistance}
          onChange={e => handleChange(e, 'ElectricalResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="FireResistanceLabel">Огнестойкость</InputLabel>
        <Select
          labelId="FireResistanceLabel"
          id="FireResistance"
          value={selected.FireResistance}
          onChange={e => handleChange(e, 'FireResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="GasTightnessLabel">Газонепроницаемость</InputLabel>
        <Select
          labelId="GasTightnessLabel"
          id="GasTightness"
          value={selected.GasTightness}
          onChange={e => handleChange(e, 'GasTightness')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="HeatResistanceLabel">Теплостойкость</InputLabel>
        <Select
          labelId="HeatResistanceLabel"
          id="HeatResistance"
          value={selected.HeatResistance}
          onChange={e => handleChange(e, 'HeatResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="FrostResistanceLabel">Морозостойкость</InputLabel>
        <Select
          labelId="FrostResistanceLabel"
          id="FrostResistance"
          value={selected.FrostResistance}
          onChange={e => handleChange(e, 'FrostResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <TextField label="Прочность ненаполненные, МПа" value={selected.StrengthUnfilled} onChange={e => handleChange(e, 'StrengthUnfilled')}/>
        <TextField label="Прочность наполненные, МПа" value={selected.StrengthFilled} onChange={e => handleChange(e, 'StrengthFilled')}/>
        <TextField label="Твердость: По Шору «А»" value={selected.Hardness} onChange={e => handleChange(e, 'Hardness')}/>
        <InputLabel id="ElasticityLabel">Эластичность</InputLabel>
        <Select
          labelId="ElasticityLabel"
          id="Elasticity"
          value={selected.Elasticity}
          onChange={e => handleChange(e, 'Elasticity')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="TearResistanceLabel">Сопротивление раздиру</InputLabel>
        <Select
          labelId="TearResistanceLabel"
          id="TearResistance"
          value={selected.TearResistance}
          onChange={e => handleChange(e, 'TearResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="WearResistanceLabel">Износостойкость</InputLabel>
        <Select
          labelId="WearResistanceLabel"
          id="WearResistance"
          value={selected.WearResistance}
          onChange={e => handleChange(e, 'WearResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="ChemicalResistanceLightLabel">Химстойкость к свету</InputLabel>
        <Select
          labelId="ChemicalResistanceLightLabel"
          id="ChemicalResistanceLight"
          value={selected.ChemicalResistanceLight}
          onChange={e => handleChange(e, 'ChemicalResistanceLight')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <InputLabel id="OxidationResistanceLabel">Химстойкость к окислению</InputLabel>
        <Select
          labelId="OxidationResistanceLabel"
          id="OxidationResistance"
          value={selected.OxidationResistance}
          onChange={e => handleChange(e, 'OxidationResistance')}>
            <MenuItem value="хор">хор</MenuItem>
            <MenuItem value="удвл">удвл</MenuItem>
            <MenuItem value="отл">отл</MenuItem>
        </Select>
        <TextField label="Мин допустимая температура" value={selected.MinOperatingTemperature} onChange={e => handleChange(e, 'MinOperatingTemperature')}/>
        <TextField label="Макс допустимая температура" value={selected.MaxOperatingTemperature} onChange={e => handleChange(e, 'MaxOperatingTemperature')}/>
          <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form> }
    </div>
    )
}

export default Rubbers;
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

function RubbersTypes({ isAdmin }) {
  const basePath = 'rubbers-types';
  const defaultValues = {
    IdRubberType:	'',
	  IdRubberGeneralTypeFK: '',
	  Name: '',
  }
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ rubGenTypes, setRubGenTypes ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdRubberType', headerName: 'ID типа каучука', flex: 1},
    {field: 'IdRubberGeneralTypeFK', headerName: 'Тип назначения', flex: 5},
    {field: 'Name', headerName: 'Наименование типа каучука', flex: 5},
  ]

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
    fetchData(`/rubbers-general-types/all`, setRubGenTypes);
  }, [])

  useEffect(() => {
    addRows(values, columns, setRows)
  }, [values])

  const handleChange = (event, key) => {
    setSelected((prev) => { 
      return {...prev, [key]: event.target.value}})
  };

  const handleCreate = () => {
    if (selected.IdRubberGeneralTypeFK && selected.Name) {
      axios
      .post(`${hostPath}/${basePath}/create`, {
        IdRubberGeneralTypeFK: selected.IdRubberGeneralTypeFK,
        Name: selected.Name,
      })
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
    if (selected.IdRubberGeneralTypeFK && selected.Name) {
      axios
      .put(`${hostPath}/${basePath}/update`, {
        IdRubberType: selected.IdRubberType,
        IdRubberGeneralTypeFK: selected.IdRubberGeneralTypeFK,
        Name: selected.Name,
      })
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
      .put(`${hostPath}/${basePath}/delete`, { IdRubberType: selected.IdRubberType })
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
      {isAdmin && <form className="table__form" noValidate autoComplete="off">
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
          <InputLabel id="IdRubberGeneralTypeFKLabel">Тип назначения</InputLabel>
          <Select
            labelId="IdRubberGeneralTypeFKLabel"
            id="IdRubberGeneralTypeFK"
            value={selected.IdRubberGeneralTypeFK}
            onChange={e => handleChange(e, 'IdRubberGeneralTypeFK')}
          >
            {rubGenTypes && rubGenTypes.map((v, index) => <MenuItem key={index} value={v.IdRubberGeneralType}>{v.NameOfDestination}</MenuItem>)}
          </Select>
          <TextField label="Наименование типа каучука" value={selected.Name} onChange={e => handleChange(e, 'Name')}/>
          <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default RubbersTypes;
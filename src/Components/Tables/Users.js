import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import ClearButton from "../ClearButton";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import hostPath from '../../Services/constant'

function Users({ isAdmin }) {
  const basePath = 'users';

  const defaultValues = {
    IdUser: '',
    Login: '',
    Pass: '',
    IdUserTypeFK: '',
  }

  const columnsNames = Object.keys(defaultValues).map(k => k);
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdUser', headerName: 'ID пользователя', flex: 1},
    {field: 'Login', headerName: 'Логин', flex: 5},
    {field: 'Pass', headerName: 'Хэш пароля', flex: 5},
    {field: 'IdUserTypeFK', headerName: 'Тип пользователя', flex: 5},
  ]
  const [ userTypes, setUserTypes ] = useState(null);

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
    fetchData(`/user-types/all`, setUserTypes);
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
      if (!selected[k] && k !== 'IdUser') {
        console.log(k)
        error = true;
      }
    });

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
      if (!selected[k]) {
        error = true;
      }
    });
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
    }
  }

  const handleDelete = () => {
    axios
      .put(`${hostPath}/${basePath}/delete`, { IdUser: selected.IdUser })
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
      <DataGrid disableColumnMenu className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      <form className="table__form" noValidate autoComplete="off">
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <TextField label="Логин" value={selected.Login} onChange={e => handleChange(e, 'Login')}/>
        <TextField label="Пароль" value={selected.Pass} onChange={e => handleChange(e, 'Pass')}/>
        <InputLabel id="IdUserTypeFKLabel">Тип пользователя</InputLabel>
        <Select
          labelId="IdUserTypeFKLabel"
          id="IdUserTypeFK"
          value={selected.IdUserTypeFK}
          onChange={e => handleChange(e, 'IdUserTypeFK')}>
            {userTypes && userTypes.map((v, index) => <MenuItem key={index} value={v.IdUserType}>{v.UserTypeName}</MenuItem>)}
        </Select>
        <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>
    </div>
    )
}

export default Users;
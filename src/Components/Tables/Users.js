import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import ClearButton from "../ClearButton";
import Toolbar from "../Toolbar"

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
    {field: 'IdUser', headerName: 'IdUser', flex: 1},
    {field: 'Login', headerName: 'Login', flex: 5},
    {field: 'Pass', headerName: 'Pass', flex: 5},
    {field: 'IdUserTypeFK', headerName: 'IdUserTypeFK', flex: 5},
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
      .put(`${hostPath}/${basePath}/delete`, { IdUser: selected.IdUser })
      .then(() => {
        console.log(`Row removed.`)
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error ${error}`))
  }

  return(
    <div className="table__container"> 
      <DataGrid disableColumnMenu className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      <form className="table__form" noValidate autoComplete="off">
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <TextField label="Login" value={selected.Login} onChange={e => handleChange(e, 'Login')}/>
        <TextField label="Pass" value={selected.Pass} onChange={e => handleChange(e, 'Pass')}/>
        <TextField label="IdUserTypeFK" value={selected.IdUserTypeFK} onChange={e => handleChange(e, 'IdUserTypeFK')}/>
        <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>
    </div>
    )
}

export default Users;
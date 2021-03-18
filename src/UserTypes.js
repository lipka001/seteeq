import React, {useEffect, useState} from "react";
import { fetchData, addRows } from './utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from './CrudButtons';

function UserTypes() {
  const hostPath = 'http://localhost:8000';
  const basePath = 'user-types';

  const defaultValues = {
    IdUserType: '',
    UserTypeName: '',
  }

  const columnsNames = Object.keys(defaultValues).map(k => k);
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdUserType', headerName: 'IdUserType', flex: 1},
    {field: 'UserTypeName', headerName: 'UserTypeName', flex: 5},
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
      .put(`${hostPath}/${basePath}/delete`, { IdUserType: selected.IdUserType })
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
        <TextField label="UserTypeName" value={selected.UserTypeName} onChange={e => handleChange(e, 'UserTypeName')}/>
        <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>
    </div>
    )
}

export default UserTypes;
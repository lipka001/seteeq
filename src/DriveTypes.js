import React, {useEffect, useState} from "react";
import { fetchData, addRows } from './utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from './CrudButtons';

function DriveTypes({ isAdmin }) {
  const hostPath = 'http://localhost:8000';
  const basePath = 'drive-types';

  const defaultValues = {
    IdDriveType: '',
    NameDriveType: '',
  }

  const columnsNames = Object.keys(defaultValues).map(k => k);
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdDriveType', headerName: 'IdDriveType', flex: 1},
    {field: 'NameDriveType', headerName: 'NameDriveType', flex: 5},
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
      .put(`${hostPath}/${basePath}/delete`, { IdDriveType: selected.IdDriveType })
      .then(() => {
        console.log(`Row removed.`)
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error ${error}`))
  }
  console.log(isAdmin);
  return(
    <div style={{height: '80vh', width: '70vw'}}> 
      <DataGrid rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      {isAdmin && <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column',  width: '25vw' }}>
        <TextField label="NameDriveType" value={selected.NameDriveType} onChange={e => handleChange(e, 'NameDriveType')}/>
         <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default DriveTypes;
import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import Toolbar from "../Toolbar";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import hostPath from '../../Services/constant'
import ClearButton from "../ClearButton";

function DriveTypes({ isAdmin }) {
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
    {field: 'IdDriveType', headerName: 'ID типа привода', flex: 1},
    {field: 'NameDriveType', headerName: 'Тип привода', flex: 5},
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
    let error = false;
    Object.keys(selected).forEach(k => { 
      if (!selected[k] && k !== 'IdDriveType') {
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
      if (!selected[k] && k !== 'IdDriveType') {
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
    } else {
      setIsError(true);
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
        <TextField label="Тип привода" value={selected.NameDriveType} onChange={e => handleChange(e, 'NameDriveType')}/>
         <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default DriveTypes;
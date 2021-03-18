import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from '../CrudButtons';
import Toolbar from "../Toolbar"


import hostPath from '../../Services/constant'
import ClearButton from "../ClearButton";

function RubberGenTypes({ isAdmin }) {
  const basePath = 'rubbers-general-types';

  const defaultValues = {
    IdRubberGeneralType: '',
    NameOfDestination: '',
  }
  const [ rows,  setRows ] = useState([]);
  const [ values, setValues ] = useState(null);
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdRubberGeneralType', headerName: 'IdRubberGeneralType', flex: 1},
    {field: 'NameOfDestination', headerName: 'NameOfDestination', flex: 5},
  ]

  useEffect(() => {
    fetchData(`/${basePath}/all`, setValues);
  }, [])

  useEffect(() => {
    addRows(values, columns, setRows)
  }, [values])

  const handleChange = key => event => {
    setSelected(prev => {return {...prev, [key]: event.target.value}})
  };

  const handleCreate = () => {
    if (selected.NameOfDestination) {
      axios
      .post(`${hostPath}/${basePath}/create`, {
        NameOfDestination: selected.NameOfDestination,
      })
      .then(res => {
        console.log(res.data);
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error: ${error}`))
    }
  }

  const handleUpdate = () => {
    if (selected.NameOfDestination) {
      axios
      .put(`${hostPath}/${basePath}/update`, {
        IdRubberGeneralType: selected.IdRubberGeneralType,
        NameOfDestination: selected.NameOfDestination,
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
      .put(`${hostPath}/${basePath}/delete`, { IdRubberGeneralType: selected.IdRubberGeneralType })
      .then(() => {
        console.log(`Row removed.`)
        fetchData(`/${basePath}/all`, setValues);
        setSelected(defaultValues);
      })
      .catch(error => console.error(`There was an error ${error}`))
  }

  return(
    <div className="table__container"> 
      <DataGrid disableColumnMenu={isAdmin} components={!isAdmin ? { Toolbar } : null} className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      {isAdmin &&<form className="table__form" noValidate autoComplete="off">
        <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
        <TextField label="NameOfDestination" value={selected.NameOfDestination} onChange={handleChange('NameOfDestination')}/>
        <CrudButtons className="table__btns"
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default RubberGenTypes;
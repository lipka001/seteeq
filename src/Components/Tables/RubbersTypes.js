import React, {useEffect, useState} from "react";
import { fetchData, addRows } from '../../Services/utils';
import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import CrudButtons from "../CrudButtons";
import ClearButton from "../ClearButton";
import Toolbar from "../Toolbar"

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
  const [ selected, setSelected ] = useState(defaultValues);
  const columns = [
    {field: 'IdRubberType', headerName: 'IdRubberType', flex: 1},
    {field: 'IdRubberGeneralTypeFK', headerName: 'IdRubberGeneralTypeFK', flex: 5},
    {field: 'Name', headerName: 'Name', flex: 5},
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

  return(
    <div className="table__container"> 
      <DataGrid disableColumnMenu={isAdmin} components={!isAdmin ? { Toolbar } : null} className="table__table" rows={rows} columns={columns} autoPageSize onCellClick={(cell) => setSelected(cell.row)}/>
      {isAdmin && <form className="table__form" noValidate autoComplete="off">
      <ClearButton
          setSelected={setSelected}
          defaultValues={defaultValues}/>
          <TextField label="IdRubberGeneralTypeFK" value={selected.IdRubberGeneralTypeFK} onChange={e => handleChange(e, 'IdRubberGeneralTypeFK')}/>
          <TextField label="Name" value={selected.Name} onChange={e => handleChange(e, 'Name')}/>
          <CrudButtons
            handleDelete={handleDelete}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}/>
      </form>}
    </div>
    )
}

export default RubbersTypes;
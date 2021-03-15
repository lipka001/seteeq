import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          {children}
        </Box>
      )}
    </div>
  );
}


function User() {
  const hostPath = 'http://localhost:8000';

  const [ valueTab, setValueTab ] = useState(1);
  const [ paramGenTypes, setParamGenTypes ] = useState(null);
  const [ paramTypes, setParamTypes ] = useState(null);
  const [ columnsPGT, setColumnsPGT ] = useState(null);
  const [ columnsPT, setColumnsPT ] = useState(null);
  const [ rowsPGT,  setRowsPGT ] = useState([]);
  const [ rowsPT,  setRowsPT ] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const fetchData = async (path, set) => {
    axios
      .get(`${hostPath}${path}`)
      .then(response => {
        set(response.data)
      })
      .catch(error => console.error(`There was an error: ${error}`))
  }

  useEffect(() => {
    let cleanupFunction = false;
    
    if(!cleanupFunction) {
      fetchData('/param-general-types/all', setParamGenTypes);
      fetchData('/param-types/all', setParamTypes);
    }

    return () => cleanupFunction = true;
  }, [])

  const setColumns = (value, setColumn) => {
    if (value) {
      setColumn(Object.keys(value[0]).map(k => { return {field: k, headerName: k, width: 200}}));
    }
  }

  useEffect(() => {
    setColumns(paramGenTypes, setColumnsPGT)
    setColumns(paramTypes, setColumnsPT)
  }, [paramGenTypes, paramTypes])

  return (
    <div className="App">
      <Tabs
        value={valueTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="disabled tabs example">
        <Tab label="Типы назначений каучуков" value={1}/>
        <Tab label="Типы каучуков" value={2}/>
      </Tabs>
      <TabPanel value={valueTab} index={1}>
        <div style={{ height: '75vh', width: '65vw' }}>
          //Что -то пошло не так здесь{paramGenTypes && 
            <DataGrid rows={paramGenTypes} columns={columnsPGT} autoPageSize />
          }
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
      <div style={{ height: '75vh', width: '65vw' }}>
          {/* <DataGrid rows={} columns={columnsPT} autoPageSize /> */}
        </div>
      </TabPanel>
    </div>
  );
}

export default User;

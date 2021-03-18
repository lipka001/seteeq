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


function User({ setUser }) {
  const hostPath = 'http://localhost:8000';

  const columnsPGT = [
    {field: 'IdRubberGeneralType', headerName: 'IdRubberGeneralType', flex: 1},
    {field: 'NameOfDestination', headerName: 'NameOfDestination', flex: 5},
  ]

  const columnsPT = [
    {field: 'IdRubberType', headerName: 'IdRubberType', flex: 1},
    {field: 'IdRubberGeneralTypeFK', headerName: 'IdRubberGeneralTypeFK', flex: 5},
    {field: 'Name', headerName: 'Name', flex: 5},
  ]

  const columnsRubbers = [
    {field: 'IdRubber', headerName: 'IdRubber', width: 100},
    {field: 'IdRubberTypeFK', headerName: 'IdRubberTypeFK', width: 100},
    {field: 'RubberName', headerName: 'RubberName', width: 200},
    {field: 'Density', headerName: 'Density', width: 200},
    {field: 'TensileStrength', headerName: 'TensileStrength', width: 200},
    {field: 'RelativeElongation', headerName: 'RelativeElongation', width: 200},
    {field: 'ElectricalResistance', headerName: 'ElectricalResistance', width: 200},
    {field: 'FireResistance', headerName: 'FireResistance', width: 200},
    {field: 'GasTightness', headerName: 'GasTightness', width: 200},
    {field: 'HeatResistance', headerName: 'HeatResistance', width: 200},
    {field: 'FrostResistance', headerName: 'FrostResistance', width: 200},
    {field: 'StrengthUnfilled', headerName: 'StrengthUnfilled', width: 200},
    {field: 'StrengthFilled', headerName: 'StrengthFilled', width: 200},
    {field: 'Hardness', headerName: 'Hardness', width: 200},
    {field: 'Elasticity', headerName: 'Elasticity', width: 200},
    {field: 'TearResistance', headerName: 'TearResistance', width: 200},
    {field: 'WearResistance', headerName: 'WearResistance', width: 200},
    {field: 'ChemicalResistanceLight', headerName: 'ChemicalResistanceLight', width: 200},
    {field: 'OxidationResistance', headerName: 'OxidationResistance', width: 200},
    {field: 'MinOperatingTemperature', headerName: 'MinOperatingTemperature', width: 200},
    {field: 'MaxOperatingTemperature', headerName: 'MaxOperatingTemperature', width: 200},
  ]

  const columnsUserTypes = [
    {field: 'IdUserType', headerName: 'IdUserType', flex: 1},
    {field: 'UserTypeName', headerName: 'UserTypeName', flex: 5},
  ]

  const columnsUsers = [
    {field: 'IdUser', headerName: 'IdUser', flex: 1},
    {field: 'Login', headerName: 'Login', flex: 5},
    {field: 'Pass', headerName: 'Pass', flex: 5},
    {field: 'IdUserTypeFK', headerName: 'IdUserTypeFK', flex: 5},
  ]

  const columnsManufac = [
    {field: 'IdManufacturer', headerName: 'IdManufacturer', flex: 1},
    {field: 'ManufacturerName', headerName: 'ManufacturerName', flex: 5},
    {field: 'URL', headerName: 'URL', flex: 5},
    {field: 'Email', headerName: 'Email', flex: 5},
    {field: 'Phone', headerName: 'Phone', flex: 5},
  ]

  const columnsDriveTypes = [
    {field: 'IdDriveType', headerName: 'IdDriveType', flex: 1},
    {field: 'NameDriveType', headerName: 'NameDriveType', flex: 5},
  ]

  const columnsMixdev = [
    {field: 'IdMixingDeviceType', headerName: 'IdMixingDeviceType', flex: 1},
    {field: 'MixingDeviceTypeName', headerName: 'MixingDeviceTypeName', flex: 5},
  ]

  const columnsReactors = [
    {field: 'IdReactor', headerName: 'IdReactor', width: 100},
    {field: 'IdDriveTypeFK', headerName: 'IdDriveTypeFK', width: 100},
    {field: 'IdMixingDeviceTypeFK', headerName: 'IdMixingDeviceTypeFK', width: 200},
    {field: 'IdManufacturerFK', headerName: 'IdManufacturerFK', width: 200},
    {field: 'NominalVolume', headerName: 'NominalVolume', width: 200},
    {field: 'JacketVolume', headerName: 'JacketVolume', width: 200},
    {field: 'WeightWithoutLiquid', headerName: 'WeightWithoutLiquid', width: 200},
    {field: 'PowerOutput', headerName: 'PowerOutput', width: 200},
    {field: 'RotationSpeed', headerName: 'RotationSpeed', width: 200},
    {field: 'HousingPressure', headerName: 'HousingPressure', width: 200},
    {field: 'JacketPressure', headerName: 'JacketPressure', width: 200},
    {field: 'Height', headerName: 'Height', width: 200},
    {field: 'Width', headerName: 'Width', width: 200},
    {field: 'ElectricMotorBrand', headerName: 'ElectricMotorBrand', width: 200},
  ]

  const [ valueTab, setValueTab ] = useState(1);

  const [ paramGenTypes, setParamGenTypes ] = useState(null);
  const [ paramTypes, setParamTypes ] = useState(null);
  const [ rubbers, setRubbers ] = useState(null);
  const [ users, setUsers ] = useState(null);
  const [ userTypes, setUserTypes ] = useState(null);
  const [ manufac, setManufac ] = useState(null);
  const [ mixdev, setMixdev ] = useState(null);
  const [ driveTypes, setDriveTypes ] = useState(null);
  const [ reactors, setReactors ] = useState(null);


  const [ rowsPGT,  setRowsPGT ] = useState([]);
  const [ rowsPT,  setRowsPT ] = useState([]);
  const [ rowsRubbers, setRowsRubbers ] = useState(null);
  const [ rowsUsers, setRowsUsers ] = useState(null);
  const [ rowsUserTypes, setRowsUserTypes ] = useState(null);
  const [ rowsManufac, setRowsManufac ] = useState(null);
  const [ rowsMixdev, setRowsMixdev ] = useState(null);
  const [ rowsDriveTypes, setRowsDriveTypes ] = useState(null);
  const [ rowsReactors, setRowsReactors ] = useState(null);

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
      fetchData('/rubbers-general-types/all', setParamGenTypes);
      fetchData('/rubbers-types/all', setParamTypes);
      fetchData('/rubbers/all', setRubbers);
      fetchData('/users/all', setUsers);
      fetchData('/user-types/all', setUserTypes);
      fetchData('/manufac/all', setManufac);
      fetchData('/mixdev/all', setMixdev);
      fetchData('/drive-types/all', setDriveTypes);
      fetchData('/reactors/all', setReactors);
    }

    return () => cleanupFunction = true;
  }, [])

  const setRows = (value, columns, setRow) => {
    const key = columns[0].field;

    if (value) {
      const arrayRows = value.map(v => {
        return {
          id: v[key],
          ...v,
        }
      });

      setRow(arrayRows);
    }
  }


  useEffect(() => {
    if (paramGenTypes && paramTypes && rubbers && users && userTypes && manufac && mixdev && driveTypes && reactors) {
      setRows(paramGenTypes, columnsPGT, setRowsPGT);
      setRows(paramTypes, columnsPT, setRowsPT);
      setRows(rubbers, columnsRubbers, setRowsRubbers);
      setRows(users, columnsUsers, setRowsUsers);
      setRows(userTypes, columnsUserTypes, setRowsUserTypes);
      setRows(manufac, columnsManufac, setRowsManufac);
      setRows(mixdev, columnsMixdev, setRowsMixdev);
      setRows(driveTypes, columnsDriveTypes, setRowsDriveTypes);
      setRows(reactors, columnsReactors, setRowsReactors);
    }

  }, [paramGenTypes, paramTypes, rubbers, users, userTypes, manufac, mixdev, driveTypes, reactors])

  return (
    <div style={{display: 'flex'}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={valueTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}>
        <Tab label="Типы назначений каучуков" value={1}/>
        <Tab label="Типы каучуков" value={2}/>
        <Tab label="Каучуки" value={3}/>
        <Tab label="Пользователи" value={4}/>
        <Tab label="Типы пользователей" value={5}/>
        <Tab label="Производители" value={6}/>
        <Tab label="Смешивающие устройства" value={7}/>
        <Tab label="Приводы" value={8}/>
        <Tab label="Реакторы" value={9}/>
        <Button variant="contained" color="secondary" onClick={() => setUser(null)}>Выйти</Button>
      </Tabs>
      <TabPanel value={valueTab} index={1}>
        <div style={{ height: '75vh', width: '65vw' }}>
          {(rowsPGT && columnsPGT) &&
            <DataGrid rows={rowsPGT} columns={columnsPGT} autoPageSize />
          }
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsPT} columns={columnsPT} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={3}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsRubbers} columns={columnsRubbers} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={4}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsUsers} columns={columnsUsers} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={5}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsUserTypes} columns={columnsUserTypes} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={6}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsManufac} columns={columnsManufac} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={7}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsMixdev} columns={columnsMixdev} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={8}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsDriveTypes} columns={columnsDriveTypes} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={9}>
      <div style={{ height: '75vh', width: '65vw' }}>
          <DataGrid rows={rowsReactors} columns={columnsReactors} autoPageSize />
        </div>
      </TabPanel>
    </div>
  );
}

export default User;

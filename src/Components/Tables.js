import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import RubberGenTypes from './Tables/RubberGenTypes';
import RubbersTypes from './Tables/RubbersTypes';
import Rubbers from './Tables/Rubbers';
import Users from './Tables/Users';
import UserTypes from './Tables/UserTypes';
import Manufacturers from './Tables/Manufacturers'
import MixDevs from './Tables/MixDevs'
import DriveTypes from './Tables/DriveTypes';
import Reactors from './Tables/Reactors';

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
        <Box p={3} style={{ display: 'flex', flexDirection: 'row'}}>
          {children}
        </Box>
      )}
    </div>
  );
}


function Admin({ setUser, isAdmin }) {
  const [ valueTab, setValueTab ] = useState(1);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div className="tables">
      <div className="tables__header">
        <Button variant="contained" color="secondary" onClick={() => setUser(null)}>Выход</Button>
      </div>
      <Tabs
        orientation="horizontal"
        value={valueTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}>
        <Tab label="Типы назначений каучуков" value={1}/>
        <Tab label="Типы каучуков" value={2}/>
        <Tab label="Каучуки" value={3}/>
        {isAdmin && <Tab label="Пользователи" value={4}/>}
        {isAdmin && <Tab label="Типы пользователей" value={5}/>}
        <Tab label="Смешивающие устройства" value={7}/>
        <Tab label="Приводы" value={8}/>
        <Tab label="Реакторы" value={9}/>
      </Tabs>
      <TabPanel value={valueTab} index={1}>
        <RubberGenTypes isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        <RubbersTypes isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={3}>
        <Rubbers isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={4}>
        <Users isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={5}>
        <UserTypes isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={7}>
        <MixDevs isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={8}>
        <DriveTypes isAdmin={isAdmin}/>
      </TabPanel>
      <TabPanel value={valueTab} index={9}>
        <Reactors isAdmin={isAdmin}/>
      </TabPanel>
    </div>
  );
}

export default Admin;

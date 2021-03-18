import React, { useEffect, useState } from 'react';
import './App.css';

import Login from './Components/Login'

function App() {

  const isAdmin = true;

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

import Admin from './Admin';
import User from './User'

export default function Login() {
  const hostPath = 'http://localhost:8000';
  const [ login, setLogin ] = useState("");
  const [ pass, setPass ] = useState("");
  const [ user, setUser ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${hostPath}/login`, { params: {Login: login, Pass: pass} })
      .then(response => {
        setUser(response.data)
      })
      .catch(error => console.error(`There was an error: ${error}`))
  }

  if (!user) {
    return (
      <div>
          <form onSubmit={handleSubmit}>
          <Card style={{height: '27vh', width: '20vw'}}>
          <CardContent>
              <p style={{fontSize: '1.5rem'}}>Вход в базу данных</p>
            <TextField label="Логин" style={{width: '100%'}} value={login} onChange={(e) => setLogin(e.target.value)}/>
            <TextField label="Пароль" style={{width: '100%'}} value={pass} onChange={(e) => setPass(e.target.value)}/>
          </CardContent>
          <CardActions>
              <Button variant="contained" color="primary" type="submit" disableElevation>Войти</Button>
          </CardActions>
          </Card>
          </form>
    </div>
    );
  } else {
    return (
    <Admin isAdmin={user.IdUserTypeFK === 1} setUser={setUser}/>
    )
  }
}
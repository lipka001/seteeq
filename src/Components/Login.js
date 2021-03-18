import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tables from './Tables';

import hostPath from '../Services/constant'

export default function Login() {
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
    setLogin("")
    setPass("")
  }

  if (!user) {
    return (
      <div className="card-container">
          <form onSubmit={handleSubmit}>
          <Card className="card">
          <CardContent className="card__content">
              <p className="card__text">Вход в базу данных</p>
            <TextField className="card__field" label="Логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <TextField className="card__field" label="Пароль" value={pass} onChange={(e) => setPass(e.target.value)}/>
          </CardContent>
          <CardActions className="card__actions">
              <Button className="card__btn" variant="contained" color="primary" type="submit" disableElevation>Войти</Button>
          </CardActions>
          </Card>
          </form>
    </div>
    );
  } else {
    return (
    <Tables isAdmin={user.IdUserTypeFK === 1} setUser={setUser}/>
    )
  }
}
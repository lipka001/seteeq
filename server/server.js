const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors');
const utils = require('./utils');


const port = 8000;

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 
app.use(cors());

app.get('/param-general-types/all', (req, res) => utils.selectAll(req, res, 'RubberGeneralTypes'))
app.get('/param-types/all', (req, res) => utils.selectAll(req, res, 'RubberTypes'))

app.listen(port, () => {
  console.log('We are live on ' + port);
});  
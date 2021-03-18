const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors');
const utils = require('./utils');

const rubbersColumns =  [
  'IdRubberTypeFK',
  'RubberName',
  'Density',
  'TensileStrength',
  'RelativeElongation',
  'ElectricalResistance',
  'FireResistance',
  'GasTightness',
  'HeatResistance',
  'FrostResistance',
  'StrengthUnfilled',
  'StrengthFilled',
  'Hardness',
  'Elasticity',
  'TearResistance',
  'WearResistance',
  'ChemicalResistanceLight',
  'OxidationResistance',
  'MinOperatingTemperature',
  'MaxOperatingTemperature',
];

const userColumns = [
 'Login',
 'Pass',
 'IdUserTypeFK',
];

const manufacColumns = [
  'ManufacturerName',
  'URL',
  'Email',
  'Phone',
];

const reactorColumns = [
  'IdDriveTypeFK',
  'IdMixingDeviceTypeFK',
  'IdManufacturerFK',
  'NominalVolume',
  'JacketVolume',
  'WeightWithoutLiquid',
  'PowerOutput',
  'RotationSpeed',
  'HousingPressure',
  'JacketPressure',
  'Height',
  'Width',
  'ElectricMotorBrand',
]
const port = 8000;

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) 
app.use(cors());

// Read tables
app.get('/rubbers-general-types/all', (req, res) => utils.selectAll(req, res, 'RubberGeneralTypes'))
app.get('/rubbers-types/all', (req, res) => utils.selectAll(req, res, 'RubberTypes'))
app.get('/rubbers/all', (req, res) => utils.selectAll(req, res, 'Rubbers'))
app.get('/users/all', (req, res) => utils.selectAll(req, res, 'Users'))
app.get('/user-types/all', (req, res) => utils.selectAll(req, res, 'UserTypes'))
app.get('/manufac/all', (req, res) => utils.selectAll(req, res, 'Manufacturers'))
app.get('/mixdev/all', (req, res) => utils.selectAll(req, res, 'MixingDeviceTypes'))
app.get('/drive-types/all', (req, res) => utils.selectAll(req, res, 'DriveTypes'))
app.get('/reactors/all', (req, res) => utils.selectAll(req, res, 'Reactors'))

app.get('/login', (req, res) => utils.checkLoginPass(req, res))
// Create
app.post('/rubbers-general-types/create', (req, res) => utils.add(req, res, 'RubberGeneralTypes', ['NameOfDestination']))
app.post('/rubbers-types/create', (req, res) => utils.add(req, res, 'RubberTypes', ['IdRubberGeneralTypeFK', 'Name']))
app.post('/rubbers/create', (req, res) => utils.add(req, res, 'Rubbers', rubbersColumns));
app.post('/users/create', (req, res) => utils.add(req, res, 'Users', userColumns));
app.post('/user-types/create', (req, res) => utils.add(req, res, 'UserTypes', ['UserTypeName']));
app.post('/manufac/create', (req, res) => utils.add(req, res, 'Manufacturers', manufacColumns));
app.post('/mixdev/create', (req, res) => utils.add(req, res, 'MixingDeviceTypes', ['MixingDeviceTypeName']));
app.post('/drive-types/create', (req, res) => utils.add(req, res, 'DriveTypes', ['NameDriveType']));
app.post('/reactors/create', (req, res) => utils.add(req, res, 'Reactors', reactorColumns));

// Delete
app.put('/rubbers-general-types/delete', (req, res) => utils.delete(req, res, 'RubberGeneralTypes', 'IdRubberGeneralType'))
app.put('/rubbers-types/delete', (req, res) => utils.delete(req, res, 'RubberTypes', 'IdRubberType'))
app.put('/rubbers/delete', (req, res) => utils.delete(req, res, 'Rubbers', 'IdRubber'))
app.put('/users/delete', (req, res) => utils.delete(req, res, 'Users', 'IdUser'))
app.put('/user-types/delete', (req, res) => utils.delete(req, res, 'UserTypes', 'IdUserType'))
app.put('/manufac/delete', (req, res) => utils.delete(req, res, 'Manufacturers', 'IdManufacturer'))
app.put('/mixdev/delete', (req, res) => utils.delete(req, res, 'MixingDeviceTypes', 'IdMixingDeviceType'))
app.put('/drive-types/delete', (req, res) => utils.delete(req, res, 'DriveTypes', 'IdDriveType'))
app.put('/reactors/delete', (req, res) => utils.delete(req, res, 'Reactors', 'IdReactor'))

//Update
app.put('/rubbers-general-types/update', (req, res) => utils.update(req, res, 'RubberGeneralTypes', ['NameOfDestination'], 'IdRubberGeneralType'))
app.put('/rubbers-types/update', (req, res) => utils.update(req, res, 'RubberTypes', ['IdRubberGeneralTypeFK', 'Name'], 'IdRubberType'))
app.put('/rubbers/update', (req, res) => utils.update(req, res, 'Rubbers', rubbersColumns, 'IdRubber'))
app.put('/users/update', (req, res) => utils.update(req, res, 'Users', userColumns, 'IdUser'))
app.put('/user-types/update', (req, res) => utils.update(req, res, 'UserTypes', ['UserTypeName'], 'IdUserType'))
app.put('/manufac/update', (req, res) => utils.update(req, res, 'Manufacturers', manufacColumns, 'IdManufacturer'))
app.put('/mixdev/update', (req, res) => utils.update(req, res, 'MixingDeviceTypes', ['MixingDeviceTypeName'], 'IdMixingDeviceType'))
app.put('/drive-types/update', (req, res) => utils.update(req, res, 'DriveTypes', ['NameDriveType'], 'IdDriveType'))
app.put('/reactors/update', (req, res) => utils.update(req, res, 'Reactors', reactorColumns, 'IdReactor'))

app.listen(port, () => {
  console.log('We are live on ' + port);
});  
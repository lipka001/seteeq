const knex = require('./db/db');
const SHA256 = require("crypto-js/sha256");

exports.selectAll = async (req, res, table) => {
    knex
      .select('*')
      .from(table)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json({ message: `There was an error: ${err}` })
      })
  }

exports.delete = async (req, res, table, tableId) => {
  knex(table)
    .where(tableId, req.body[tableId])
    .del()
    .then(() => {
      res.json({ message: `Row deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error ${err}` })
    })
}

exports.add = async (req, res, table, tableFields) => {
  const data = tableFields.reduce((acc,curr)=> (acc[curr] = req.body[curr],acc),{});
  if (data.Pass) {
    data.Pass = SHA256(data.Pass);
  }
  knex(table)
  .insert(data)
  .then(() => {
    res.json({ message: `Created.` })
  })
  .catch(err => {
    res.json({ message: `There was an error ${err}!` })
  })
}

exports.update = async (req, res, table, tableFields, tableId) => {
  const data = tableFields.reduce((acc,curr)=> (acc[curr] = req.body[curr],acc),{});
  knex(table)
  .where({ [tableId]: req.body[tableId]})
  .update(data)
  .then(() => {
    res.json({ message: `Created.` })
  })
  .catch(err => {
    res.json({ message: `There was an error ${err}!` })
  })
}

exports.checkLoginPass = async (req, res) => {
  knex
    .select('*')
    .from('Users')
    .where( { Login: req.query.Login, Pass: req.query.Pass } )
    .then(data => {
      res.json(data[0])
    })
    .catch(err => {
      res.json({ message: `There was an error: ${err}` })
    })
}
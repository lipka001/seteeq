const knex = require('./db/db');

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
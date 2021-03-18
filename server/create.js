const knex = require('./db/db');

// RubbersGenTypes
exports.addRubbersGenTypes = async (req, res) => {
  knex('RubberGeneralTypes')
  .insert({
    'NameOfDestination': req.body.NameOfDestination,
  })
  .then(() => {
    res.json({ message: `Created.` })
  })
  .catch(err => {
    res.json({ message: `There was an error ${err}!` })
  })
}
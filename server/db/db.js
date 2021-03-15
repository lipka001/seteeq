const path = require('path')
const dbPath = path.resolve(__dirname, './seteeq.sqlite');
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
})

module.exports = knex;
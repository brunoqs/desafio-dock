const database = require('./database');
const knex = require('knex')(database);

module.exports = knex;
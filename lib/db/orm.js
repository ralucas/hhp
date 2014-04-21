'use strict';

// var Bookshelf = require('bookshelf'),
//     config    = require('../config');

// Bookshelf.PG = Bookshelf.initialize({
//     client: 'pg',
//     connection: {
//         host: config.get('database:host'),
//         user: '',
//         password: '',
//         database: 'hhp',
//         charset: 'utf-8'
//     }
// });

// module.exports = Bookshelf.PG;

var Knex   = require('knex'),
    config = require('../config');

Knex.knex = Knex.initialize({
    client: 'pg',
    connection: {
        host: config.get('database:host'),
        user: '',
        password: '',
        database: 'hhp',
        charset: 'utf-8'
    }    
});

module.exports = Knex.knex;



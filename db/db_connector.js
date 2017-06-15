/**
 * Created by bummybomo on 13-6-2017.
 */
var mysql = require('mysql');
var config = require('../config');

var pool  = mysql.createPool( {
    host: process.env.DB_HOST || config.dbServer,
    user: process.env.DB_USER || config.dBUsername,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbSchema,
    debug: false
});



pool.getConnection(function (err, connection) {
    if (err) {
        console.error("Couldn't connect to database " + config.dbSchema + " on " + config.dbServer + ": " + err.message + ".");
        return;
    } else {
        console.log("Connected to database " + config.dbSchema + " on " + config.dbServer + ".");
        connection.release();
    }
});


module.exports = pool;

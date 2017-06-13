/**
 * Created by bummybomo on 13-6-2017.
 */
var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    connectionLimit : 25,
    host : config.dbHost,
    user : config.dbUser,
    password : config.dbPassword,
    database : config.dbDatabase,
    port : config.dbPort
});

pool.getConnection(function(err, conn){
    if (err){
        console.log(err + "It doesn't work.");
    } else {
        console.log("Connected to database " + config.dbDatabase + " with portnumber " + config.dbPort + '.');
    }
});

module.exports = pool;

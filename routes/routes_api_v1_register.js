/**
 * Created by Omidleet on 15/06/2017.
 */
var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication');

router.post('/register/', function (req,res,next) {
    var email = req.params.email;
    var password = req.params.password;

    var query_str1 = 'INSERT INTO customer(email) VALUES("' + email + '");';
    var query_str2 = 'INSERT INTO customer(password) VALUES("' + password + '");';

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str1, query_str2, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});
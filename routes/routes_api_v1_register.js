/**
 * Created by jordanh2os on 15/06/2017.
 */
var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication');
var pool = require('../db/db_connector');

//var customer aanmaken en attributen meegeven
router.post('/register', function (req,res) {
    var customer = {
        customer_id: req.body.customer_id,
        store_id: req.body.store_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        adress_id: req.body.adress_id,
        active: req.body.active,
        create_date: req.body.create_date,
        last_update: req.body.last_update,
        password: req.body.password
    };

    //INSERT de values in de database
    var query_string = "INSERT INTO customer VALUES ('" +
        customer.customer_id + "', '" +
        customer.store_id + "', '" +
        customer.first_name + "', '" +
        customer.last_name + "', '" +
        customer.email + "', '" +
        customer.adress_id + "', '" +
        customer.active + "', '" +
        customer.create_date + "', '" +
        customer.last_update + "', '" +
        customer.password + "');";

    console.log(query_string);

    //Kijkt of de connectie werkt, anders gooit die een error
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_string, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

module.exports = router;
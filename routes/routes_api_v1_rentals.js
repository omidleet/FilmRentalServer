/**
 * Created by jordanh2os on 19/06/2017.
 */
var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector');



//Functie om alle rentals van een bepaalde customer op te halen of waarbij het customer_id ingevuld kan worden
router.get('/rentals/:customer_id?', function (req,res) {
    var customer_id = req.params.customer_id;
    var query_str;

    if (customer_id) {
        query_str = 'SELECT * FROM rental WHERE customer_id = "' + customer_id + '";';
    }
    else {
        query_str = 'SELECT * FROM rental;'
    }

    //Kijkt of de connectie werkt, anders gooit die een error
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

//Maakt een nieuwe uitlening voor de gegeven gebruiker van het exemplaar met gegeven inventory id.
router.post('/rentals/:customer_id/:inventory_id', function(req, res) {

    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    var rental = {
        rental_id: req.body.rental_id,
        rental_date: req.body.rental_date,
        inventory_id: inventory_id,
        customer_id: customer_id,
        return_date: null,
        staff_id: req.body.staff_id,
        last_update: req.body.rental_date,
    };

    //INSERT de values in de database
    var query_string = "INSERT INTO rental VALUES ('" +
    rental.rental_id + "', '" +
    rental.rental_date + "', '" +
    rental.inventory_id + "', '" +
    rental.customer_id + "', '" +
    rental.return_date + "', '" +
    rental.staff_id + "', '" +
    rental.last_update + "');";

    console.log(query_string);

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_string, function (err, rows) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});


//
// Wijzig bestaande uitlening voor de gegeven gebruiker van het exemplaar megegeven inventoryid
router.put('/rentals/:customer_id/:inventory_id', function(req, res) {

    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    var returndate = req.body.return_date;
    var lastupdate = returndate;

    var query = {
        sql: 'UPDATE `rental` SET return_date=?, last_update=?  WHERE customer_id=? AND inventory_id=?',
        values: [returndate, lastupdate, customer_id, inventory_id],
        timeout: 2000 // 2secs
    };

    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});


//
// Verwijder bestaande uitlening voor de gegeven gebruiker van het exemplaar met gegeven inventory id.

router.delete('/rentals/:customer_id/:inventory_id', function(req, res) {

    var customer_id = req.params.customer_id;
    var inventory_id = req.params.inventory_id;

    var query = {
        sql: 'DELETE FROM `rental` WHERE customer_id=? AND inventory_id',
        values: [customer_id, inventory_id],
        timeout: 2000 // 2secs
    };

    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

module.exports = router;


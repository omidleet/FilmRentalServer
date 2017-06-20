/**
 * Created by Omidleet on 14/06/2017.
 */
var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector');

//Functie om alle films op te halen of op ID
router.get('/films/:film_id?', function (req,res,next) {
    var film_id = req.params.film_id;
    var query_str;

    if (film_id) {
        query_str = 'SELECT * FROM film WHERE film_id = "' + film_id + '";';
    }
    else {
        query_str = 'SELECT * FROM film;'
    }

    //Kijkt of de connectie werkt, anders gooit die een error
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json({"items" : rows});
        })
    });
});


//Geeft  alle informatie van de gevraagde films. Offset en count kunnen als  opties worden gegeven.Offset is het start punt;
// count is het aantal films vanaf de offset.
router.get('/films/offset/:offset/count/:count', function (req,res,next) {
    var offset = req.params.offset;
    var count = req.params.count;
    var query_str;

    if ( offset && count) {
        query_str = "SELECT * FROM film LIMIT " + offset + ", " +count + " ;";
    }
    else if (offset) {
        query_str = "SELECT * FROM film WHERE film_id >= " + offset + ";";
    } else {
        res.status(404);
        res.json({ "description" : "Er is een fout opgetreden, probeer het opnieuw"})
    }
    //Kijkt of de connectie werkt, anders gooit die een error
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});




module.exports = router;

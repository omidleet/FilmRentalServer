/**
 * Created by J.h2os on 15-6-2017.
 */
//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication');
var db = require('../db/db_connector')

router.post('/login', function (req, res) {

    // laat inhoud zien
    console.dir(req.body);

    // username en password worden in body gegeven
    var email = req.body.email || '';

    var password = req.body.password || '';

    // kijk of er een match is
    db.query('SELECT * FROM customer WHERE email = "' + email + '" AND password = "' + password +'"', function (error, rows){
    if (rows != ""){
        var token = auth.encodeToken(email);
        res.status(200).json({
            "token": token,
        });
    } else {
        res.status(401).json({ "error": "Invalid credentials."})
    }
});
});



// maak route beschikbaar
module.exports = router;
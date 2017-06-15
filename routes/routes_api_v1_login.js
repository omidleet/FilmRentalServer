/**
 * Created by J.h2os on 15-6-2017.
 */
//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication');

router.post('/login', function (req, res) {

    // laat inhoud zien
    console.dir(req.body);

    // username en password worden in body gegeven
    var username = req.body.username;
    var password = req.body.password;

    // dummy user, moet uit db komen
    var dummy_username = "username";
    var dummy_password = "test";

    // kijk of er een match is
    if (username == dummy_username && password == dummy_password){
        var token = auth.encodeToken(username);
        res.status(200).json({
            "token": token,
        });
    } else {
        res.status(401).json({ "error": "Invalid credentials."})
    }
});

// maak route beschikbaar
module.exports = router;
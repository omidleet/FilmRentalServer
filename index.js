/**
 * Created by bummybomo on 13-6-2017.
 */
var http = require('http');
var express = require('express');
var config = require('./config/config.json')
var db = require('./db/db_connector');
var app = express();

//Hier wordt de port opgehaald uit de config.json
app.set('PORT', config.webPort);
var port = process.env.PORT || app.get('PORT');


//Log methode voor port
app.listen(port, function(){
    console.log('This app is connected to port: ' + port);
});

//Log methode voor api requests
app.get('*', function(req, res, next){
    console.log(req.method + " " + req.url);
    next();
});

app.use('/api/v1', require('./routes/routes_api_v1_film'));
app.use('/api/v1', require('./routes/routes_api_v1_login'));

// Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd.
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'ERROR': 'Deze URL is niet beschikbaar.'
    });
});

//Endpoint voor about
app.get('/about', function(req, res){
    res.send('Deze server wordt gemaakt voor Programmeren 4 tentamen.');
});








module.exports = app;
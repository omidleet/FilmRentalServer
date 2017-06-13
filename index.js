/**
 * Created by bummybomo on 13-6-2017.
 */
var http = require('http');
var express = require('express');
var config = require('./config.json');

var app = express();

//Hier wordt de port opgehaald uit de config.json
app.set('PORT', config.webPort);
var port = process.env.PORT || app.get('PORT');



app.listen(port, function(){
    console.log('This app is connected to port: ' + port);
});



app.get('*', function(req, res, next){
    console.log(req.method + " " + req.url);
    next();
});


app.get('/about', function(req, res){
    res.send('Deze server wordt gemaakt voor Programmeren 4 tentamen.');
});








module.exports = app;
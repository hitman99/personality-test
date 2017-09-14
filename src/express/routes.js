var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var questionsByCategory = [];

// Static files
app.use(express.static(path.join(__dirname, 'public/static/')));

// For autoparsing json in POST body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/questions-by-category', function(req, res){
    res.send({
        questions: questionsByCategory
    });
});

module.exports = function(questions){
    questionsByCategory = questions;
    return app;
}
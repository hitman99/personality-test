var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var questionsByCategory = [];
var categoriesList = [];

var answers = require('../answersStorage');

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

app.get('/categories', function(req, res){
    res.send({
        categories: categoriesList
    });
});

app.post('/answers', function(req, res){
    answers.saveAnswers({ username: req.body.username, answers: req.body.answers, timestamp: new Date().getTime()})
        .then(function(msg){
            res.send({
                status: 'OK'
            });
        })
        .catch(function(msg){
            res.send({
                status: 'NOK',
                message: msg
            });
        })

});

module.exports = function(data, cfg){
    questionsByCategory = data.questions;
    categoriesList = data.categories;
    if(cfg){
        answers.setupRedis(cfg.redis);
    }
    return app;
}
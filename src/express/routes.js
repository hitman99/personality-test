var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var multer  = require('multer');
var upload = multer({ dest: 'uploads' });
var questionsByCategory = [];
var categoriesList = [];

var answers = require('../answersStorage');

// Static files
app.use(express.static(path.join(__dirname, 'public/static/')));

// For autoparsing json in POST body
app.use(bodyParser.urlencoded({extended: false, limit: '50mb', parameterLimit: 1000000}));
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

app.get('/username-check', function(req, res){
    answers.checkUsername(req.query.username)
    .then(function(status){
        res.send({
            status: status.availability
        });
    })
    .catch(function(status){
        res.send({
            status: status.availability
        });
    })
    
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

app.post('/images', upload.single('avatar'), function(req, res){
    
    res.send({
        satus: 'uploaded'
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
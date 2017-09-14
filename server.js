var cfg = require('./server.cfg.json');
var questionsDB = require('./src/questionsDB')(require(cfg.questions));
var server = require('./src/express/routes')(questionsDB);

server.listen(cfg.port, cfg.address, function () {
    console.log('Server listening on port ' + cfg.address + ':' + cfg.port + '!');
});

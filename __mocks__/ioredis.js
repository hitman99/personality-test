const IORedis = jest.genMockFromModule('ioredis');

IORedis.prototype.hget = jest.genMockFn();
IORedis.prototype.hget.mockImplementation(function (key, link) {
    link('hget');
});
IORedis.prototype.sadd = jest.genMockFn();
IORedis.prototype.sadd.mockImplementation(function (key, link) {
    link('OK', false);
});
IORedis.prototype.sismember = jest.genMockFn();
IORedis.prototype.sismember.mockImplementation(function (key, link) {
    switch(key){
        case 'test_name':
            link('OK');
            break;
        case 'duplicate_name':
            link(null, true);
            break;
        default:
            link('OK');
    }
});

module.exports = IORedis;
const IORedis = jest.genMockFromModule('ioredis');

IORedis.prototype.zadd = jest.genMockFn();
IORedis.prototype.zadd.mockImplementation(function (key, score, value, link) {
    link('OK', false);
});
IORedis.prototype.sadd = jest.genMockFn();
IORedis.prototype.sadd.mockImplementation(function (key, value, link) {
    link('OK', false);
});
IORedis.prototype.sismember = jest.genMockFn();
IORedis.prototype.sismember.mockImplementation(function (key, value, link) {
    switch(value){
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
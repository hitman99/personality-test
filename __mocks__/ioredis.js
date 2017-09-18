const IORedis = jest.genMockFromModule('ioredis');

IORedis.prototype.zadd = jest.genMockFn();
IORedis.prototype.zadd.mockImplementation(function (key, score, value, link) {
    link(null, 'OK');
});
IORedis.prototype.sadd = jest.genMockFn();
IORedis.prototype.sadd.mockImplementation(function (key, value, link) {
    link(null, 'OK');
});
IORedis.prototype.sismember = jest.genMockFn();
IORedis.prototype.sismember.mockImplementation(function (key, value, link) {
    switch(value){
        case 'test_name':
            link(null, 'OK');
            break;
        default:
            link(null, 'OK');
    }
});

module.exports = IORedis;
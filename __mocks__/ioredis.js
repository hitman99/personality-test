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
            link(null, 0);
            break;
        case 'duplicate_name':
            link(null, 1);
            break;
        default:
            link(null, 0);
    }
});

module.exports = IORedis;
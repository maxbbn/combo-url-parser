var request = require('request');
var expect = require('expect.js');


describe('request', function () {
    describe('reflect server with custom host name', function () {
        var reqBody;
        before(function (done) {
            request({
                uri: {
                    hostname: '10.125.202.112',
                    port: '',
                    pathname: '/abc.json',
                    protocol: 'http:'
                },
                headers: {
                    host: 't6l-tb-xcake-0-0-2.webtest.taobao.com'
                }
            }, function(err, req, body){
                if (err) {
                    done(err);
                    return;
                }
                reqBody = body;
                done()
            });
        });

        it('body has content', function () {
            expect(reqBody).to.be.a('string')
                .and.to.have.length(413)
        });
    });

    describe('local server with port', function () {
        var reqBody;
        before(function (done) {
            request({
                uri: {
                    hostname: '127.0.0.1',
                    port: 3333,
                    pathname: '/abc.json',
                    protocol: 'http:'
                },
                headers: {
                    host: '127.0.0.1:3333'
                }
            }, function(err, req, body){
                if (err) {
                    done(err);
                    return;
                }
                reqBody = body;
                done();
            });

        });
        it('body has content', function () {
            expect(reqBody).to.be.a('string')
                .and.to.have.length(413);
        });
    });

    describe('g.tbcdn.cn', function () {
        var reqBody;
        before(function (done) {
            request({
                uri: {
                    hostname: '10.125.202.112',
                    port: '',
                    pathname: '/kissy/k/1.4.1/seed.js',
                    protocol: 'http:'
                },
                headers: {
                    host: 't6l-tb-xcake-0-0-2.cdef.taobao.net',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.2 Safari/537.36'
                }
            }, function(err, req, body){
                if (err) {
                    done(err);
                    return;
                }
                reqBody = body;
                done();
            });

        });

        it('body has content', function () {
            expect(reqBody).to.be.a('string')
                .and.to.have.length(199420);
        });
    });
});
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
            expect(reqBody).to.be.ok();
            expect(reqBody).to.be.a('string');
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
            expect(reqBody).to.be.ok();
            expect(reqBody).to.be.a('string');
        });
    });
});




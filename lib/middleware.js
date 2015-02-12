var parser = require('./parser.js');
var request = require('request');
var async = require('async');


/**
 * Middleware for connect
 * @param options
 * @param options.limit
 * @returns {Function}
 */
module.exports = function (options) {

    var headers = ['content-type', 'vary', 'access-control-allow-origin'].map(function (key) {
        return [key, key.split('-').map(function (word) {
            return word[0].toUpperCase() + word.substr(1)
        }).join('-')]
    });

    return function (req, res, next) {
        var urls = parser(req.url);

        if (!urls) {
            next();
            return;
        }

        var port = req.headers.host.split(':')[1] || '';

        async.mapLimit(urls, 8, function (url, cb) {

            request({
                url: {
                    hostname: '127.0.0.1',
                    port: port,
                    pathname: url,
                    protocol: 'http:'
                },
                headers: {
                    'host': req.headers.host,
                    'userAgent': req.headers['user-agent'] || req.headers.userAgent
                },
                encoding: null
            }, function (err, resp, body) {

                if (err) {
                    cb(err);
                    return;
                }

                if (resp.statusCode === 404) {
                    var error = new Error('404');
                    error.url = url;
                    cb(error);
                }

                cb(null, {response: resp, body: body});

            });
        }, function (err, results) {
            if (err) {
                if (err.message === '404') {
                    err.statusCode = 404;
                    res.end('Sorry, Can not found '+ err.url);
                } else {
                    next(err);
                }
                return;
            }

            var response = results[0].response;


            headers.forEach(function (key) {
                var v = response.headers[key[0]];
                if (v) {
                    res.setHeader(key[1], v);
                }
            });

            var newline = new Buffer('\n');

            res.end(Buffer.concat(results.reduce(function(all, result) {
                if (all.length) {
                    all.push(newline);
                }

                if(result.body.length) {
                    all.push(result.body);
                }

                return all;
            }, [])));

        });
    }
};
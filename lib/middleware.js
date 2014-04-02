var parser = require('./parser.js');
var request = require('request');
var CombinedStream = require('combined-stream');
var mime = require('mime');

/**
 * Middleware for connect
 * @returns {Function}
 */
module.exports = function () {
  return function (req, res, next) {
    var urls = parser(req.url);

    if (!urls) {
      next();
      return;
    }

    // http://stackoverflow.com/questions/7109732/express-setting-content-type-based-on-path-file
    var type = mime.lookup(urls[0]);

    if (!res.getHeader('content-type')) {
      res.setHeader('Content-Type', type + '; charset=UTF-8');
    }

    var combinedStream = CombinedStream.create();
    urls.forEach(function (path) {
      combinedStream.append(request('http://' + req.headers.host + path));
      combinedStream.append('\n');
    });
    combinedStream.pipe(res);
  }
};
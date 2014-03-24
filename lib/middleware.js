var parser = require('./parser.js');
var request = require('request');
var CombinedStream = require('combined-stream');

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

    var combinedStream = CombinedStream.create();
    urls.forEach(function (path) {

      combinedStream.append(request('http://' + req.headers.host + path));

      combinedStream.append('\n');
    });
    combinedStream.pipe(res);
  }
};
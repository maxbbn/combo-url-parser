var parser = require('./parser.js');
var request = require('request');
var CombinedStream = require('combined-stream');

/**
 * Middleware for connect
 * @param {Object} options
 * @param {Number} options.port
 * @returns {Function}
 */
module.exports = function (options) {
  options = options || {};
  if (!options.port) {
    throw new Error('combo-url-parser: port is missing!');
  }
  var port = options.port;

  port = port ? ':' + port : '';
  return function (req, res, next) {

    var urls = parser(req.url);

    if (!urls) {
      next();
      return;
    }

    var combinedStream = CombinedStream.create();
    urls.forEach(function (path) {
      combinedStream.append(request('http://127.0.0.1' + port + '/' + path));
      combinedStream.append('\n');
    });
    combinedStream.pipe(res);
  }
};
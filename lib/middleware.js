var parser = require('./parser.js');

module.exports = function(options) {
    function (req, res, next) {
        var urls = parser(req.url);

        if (urls.length === 1) {
            next();
            return;
        }

        var CombinedStream = require('combined-stream');
        var combinedStream = CombinedStream.create();
        urls.forEach(function (path) {
            combinedStream.append(request('http://127.0.0.1:3000' + path));
            combinedStream.append('\n');
        });
        combinedStream.pipe(res);
    }
    
};
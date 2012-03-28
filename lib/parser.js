module.exports = function(url){
    var base = '',
        paths = [],
        parts,
        idx1,
        originurl = url,
        idx2;

    //remove the query
    idx1 = url.indexOf('??');
    idx2 = url.indexOf('?');

    if (idx1 > -1 && (idx1 <= idx2)) {
        base = url.substring(0, idx1);
        url = url.substring(idx1 + 2);
        idx2 = url.indexOf('?');
    }

    if (idx2 > -1) {
        url = url.substring(0, idx2);
    }

    paths = url.split(',');

    paths = paths.map(function(val){
        var path = base + '/' + val;
        return path.replace(/\/+/g, '/');
    });

    return paths;
};

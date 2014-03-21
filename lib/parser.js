var URL = require("url");

function join(a, b) {
    if (a && b) {
        a = a.replace(/\/?$/, '/');
        b = b.replace(/^\/?/, '');
    }
    
    return a + b;
}

module.exports = function(url){
    var lead = '??';
    var sep = ',';

    //get real query

    var idx1 = url.indexOf(lead);
    
    if (idx1 === -1) {
        return;
    }
    
    var base = url.substring(0, idx1);
    
    var ext = URL.parse(url.substring(idx1 + lead.length));
    
    
    return ext.pathname.split(sep).map(function(subPath){

        return URL.format({
            search: ext.search,
            pathname: join(base, subPath)
        });
    });
};

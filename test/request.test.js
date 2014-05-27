var request = require('request');

//request('http://10.125.202.112/abc.json', {
//    headers: {
//        host: 't6l-tb-xcake-0-0-2.webtest.taobao.com'
//    }
//}, function(err, req, body){
//    if (err) {
//        console.log(err);
//    }
//});


request('http://127.0.0.1:3333/abc.json', {
    headers: {
        host: '127.0.0.1:3333'
    }
}, function(err, req, body){
    if (err) {
        console.log(err);
    }
    console.log(body);
});
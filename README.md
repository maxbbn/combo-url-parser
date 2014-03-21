[![build status](https://secure.travis-ci.org/maxbbn/combo-url-parser.png)](http://travis-ci.org/maxbbn/combo-url-parser)
util to parse comboed url;

## install
````javascript
npm install combo-url-parser
````

## useage
````javascript
comboParser = require('combo-url-parser');
comboParser(url);
````
## exambles
````
'/foo.js' > ['/foo.js]

'/??foo.js,bar.js' > ['/foo.js','/bar.js']

'/hello??foo.js,bar.js' > ['/hello/foo.js','/hello/bar.js']

'/hello??foo.js,d/bar.js' > ['/hello/foo.js','/hello/d/bar.js']
````

## ChangeLog

### 0.1.1

- 修复单个 combo 无法访问的问题
- 如果 URL 中不符合parser规范， 返回 null
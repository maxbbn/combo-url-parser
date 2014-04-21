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

### 0.1.3
- 中间件，去掉配置，现在不需要配置 port
- 优化逻辑，如果一个文件不存在，就返回 404， 方便问题定件
- 使用第一个请求的 mime-type

### 0.1.2

- 添加 content-type Header

### 0.1.1

- 修复单个 combo 无法访问的问题
- 如果 URL 中不符合parser规范， 返回 null
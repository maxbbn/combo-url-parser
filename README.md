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

# myth-request
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Wraps a [myth][myth] instance into an HTTP request handler, performing the
minimal amount of rebundling required and pausing requests mid-build to avoid
getting old versions of your script on reload.

## Installation
```bash
$ npm install myth-request
```

## Usage
```js
const mr     = require('myth-request')
const rework = require('rework')
const http   = require('http')
const myth   = require('myth')
const fs     = require('fs')

const css     = fs.readFileSync('index.css', 'utf8')
const handler = mr(rework(css).use(myth()))
const server  = http.createServer()

server.on('request', function(req, res) {
  handler(req, res, function(err, body) {
    if (err) console.log(err)
    res.end(body)
  })
})

server.listen(process.env.PORT || 1337)
```

## Why?
Setting up boilerplate for myth as an http handler can be a bit annoying. This
module provides a good entry point for both development and production servers
running myth. No `gulp`, `grunt` or `make` needed.

## See Also
- [watchify-request](https://github.com/hughsk/watchify-request)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/myth-request.svg?style=flat-square
[npm-url]: https://npmjs.org/package/myth-request
[travis-image]: https://img.shields.io/travis/yoshuawuyts/myth-request.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/myth-request
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/myth-request.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/myth-request?branch=master
[downloads-image]: http://img.shields.io/npm/dm/myth-request.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/myth-request

[myth]: https://github.com/segmentio/myth

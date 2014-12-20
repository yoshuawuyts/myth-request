const st     = require('servertest')
const rework = require('rework')
const test   = require('tape')
const http   = require('http')
const myth   = require('myth')
const fs     = require('fs')
const mr     = require('./')

test('myth-request', function(t) {
  const css     = fs.readFileSync('test/index.css', 'utf8')
  const handler = mr(rework(css).use(myth()))
  const server  = http.createServer()

  server.on('request', function(req, res) {
    handler(req, res)
  })

  st(server, '/', { encoding: 'utf8' }, function(err, res) {
    t.ifError(err, 'no error')
    t.ok(res, 'server res')
    t.equal(res.body, '.foo {\n  color: blue;\n}', 'correct body content')
    t.end()
  })
})

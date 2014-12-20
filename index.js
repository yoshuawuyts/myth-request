const Emitter = require('events').EventEmitter

module.exports = mr

/**
 * Respond myth in an http request.
 *
 * @param {Function} bundler
 * @return {Function}
 * @api public
 */
function mr(bundler) {
  var prevError = null
  var pending = null
  var buffer = null

  build()
  // bundler.on('update', update)
  return handler

  /**
   * Build the CSS and pass it to `buffer`.
   *
   * @api private
   */
  function build() {
    const p = pending = new Emitter()
    buffer = bundler.toString()

    if (p !== pending) return
    pending.emit('ready', null, pending = false)
  }

  /**
   * Response middleware. Sends `buffer` to
   * either `next()` or `res.body()`.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @api private
   */
  function handler(req, res, next) {
    next = next || send

    if (pending) return pending.once('ready', function(err) {
      if (err) return next(err)
      return handler(req, res, next)
    })

    if (prevError) return next(prevError)

    res.setHeader('content-type', 'text/css')
    return next(null, buffer)

    function send(err, body) {
      if (err) return res.emit(err)
      res.end(body)
    }
  }
}

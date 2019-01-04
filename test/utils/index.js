'use strict'

module.exports.echo = require('./echo')
module.exports.poll = poll

/**
 * Calls the given `handler` on an interval of `time`, until it calls back true.
 * This is good for replacing timeouts in tests, as they can be unreliable if something
 * takes a bit longer, as often occurs in CI. Polling keeps tests as short as possible
 * instead of working on a fixed time.
 *
 * Example:
 * poll((callback) => callback(null, true), 100, done)
 * This will immediately invoke the handler function with true, causing done to
 * be called. If the handler ever calls back with something other than true,
 * poll will be called again every 100ms.
 *
 * The handler function takes a single callback argument with the footprint (err, boolean)
 *
 * @param {function(function(err, boolean))} handler function to call
 * @param {number} time interval to poll in milliseconds
 * @param {function} callback
 */
function poll (handler, time, callback) {
  handler((_, didValidate) => {
    if (didValidate === true) {
      callback()
    } else {
      setTimeout(() => {
        poll(handler, time, callback)
      }, time)
    }
  })
}

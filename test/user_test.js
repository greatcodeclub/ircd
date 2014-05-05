var assert = require('assert'),
    mocks = require('./mocks')

describe('User', function() {
  beforeEach(function () {
    this.user = mocks.user('ma')
  })

  it('sends reply', function () {
    this.user.sendReply("001", ":Welcome")

    assert.deepEqual(this.user.connection.sent,
                     ":test.local 001 ma :Welcome\r\n")
  })

  it('ping later', function (done) {
    var user = this.user

    user.pingDelay = 1
    user.pingLater()

    // Send the PING
    setTimeout(function() {
      assert.equal(user.connection.sent, "PING :test.local\r\n")
      assert(!user.connection.closed)
    }, 2)

    // Next time, the connection should be closed
    setTimeout(function() {
      assert(user.connection.closed)
      done()
    }, 10)
  })
})
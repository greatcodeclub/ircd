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

  it('sends command', function () {
    var fromUser = mocks.user('from')
    
    this.user.sendCommand(fromUser, "JOIN", "#test")
    
    assert.deepEqual(this.user.connection.sent,
                     ":from!~marc@ma.local JOIN #test\r\n")
  })
})
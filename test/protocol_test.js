var assert = require('assert'),
    protocol = require('../lib/protocol'),
    mocks = require('./mocks')

describe('Protocol', function() {
  beforeEach(function () {
    this.server = mocks.server()
    this.user = mocks.user()
  })

  it('handles NICK', function () {
    protocol.NICK(this.server, this.user, { nick: 'test' })
    
    assert.equal(this.user.nick, 'test')
  })

  it('handles QUIT', function () {
    protocol.QUIT(this.server, this.user, {})

    assert(this.user.connection.closed)
  })
})
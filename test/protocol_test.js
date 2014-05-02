var assert = require('assert')
    // protocol = require('../lib/protocol'),
    // User = require('../lib/user').User

xdescribe('Protocol', function() {
  beforeEach(function () {
    this.server = {}
    this.user = new User()
  })

  it('handles NICK', function () {
    protocol.NICK(this.server, this.user, { nick: 'test' })
    
    assert.equal(this.user.nick, 'test')
  })
})
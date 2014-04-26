var assert = require('assert'),
    mocks = require('./mocks'),
    Channel = require('../lib/channel').Channel

describe('Channel', function() {
  beforeEach(function () {
    this.user1 = mocks.user('ma')
    this.user2 = mocks.user('bob')
    this.channel = new Channel('#test')
    this.channel.join(this.user1)
    this.channel.join(this.user2)
  })

  it('sends', function () {
    this.channel.send(this.user1, "some", "data")
    assert.deepEqual(this.user1.connection.sent, [":ma!~marc@ma.local some data\r\n"])
    assert.deepEqual(this.user2.connection.sent, [":ma!~marc@ma.local some data\r\n"])
  })
})
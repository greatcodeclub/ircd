var assert = require('assert'),
    irc = require('irc'),
    _ = require('underscore'),
    server = require('../lib/server')

server.log = function() {} // quiet server

describe('Server', function() {
  function connect(nick, done) {
    // Use a real IRC client to test the server
    var client = new irc.Client('localhost', nick, { channels: ['#test'] })
    client.on('join', _.once(function() {
      done()
    }))
    return client
  }

  beforeEach(function(done) {
    var done = _.after(2, done)
    this.user1 = connect('user1', done)
    this.user2 = connect('user2', done)
  })

  afterEach(function(done) {
    var done = _.after(2, done)
    this.user1.disconnect(null, done)
    this.user2.disconnect(null, done)
  })

  it('sends names', function(done) {
    this.user2.on('names', function(channel, nicks) {
      assert.equal(channel, '#test')
      assert.deepEqual(Object.keys(nicks), ['user1', 'user2'])
      done()
    })
  })

  it('sends message', function (done) {
    this.user1.say('#test', 'Hi there')

    this.user2.on('message#test', function(nick, text, message) {
      assert.equal(nick, 'user1')
      assert.equal(text, 'Hi there')
      done()
    })
  })
})
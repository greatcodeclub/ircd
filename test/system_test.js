var assert = require('assert'),
    irc = require('irc'),
    childProcess = require('child_process')

// System tests test the whole system.
describe('System', function() {
  // Start a real server in a child process
  before(function(done) {
    this.server = childProcess.spawn('./bin/ircd')
    this.server.stdout.once('data', function() {
      done()
    })
  })
  after(function() {
    this.server.kill()
  })

  function connect(nick, done) {
    var client = new irc.Client('localhost', nick)
    client.on('registered', function() {
      client.join('#test', function() {
        done()
      })      
    })
    return client
  }

  beforeEach(function(done) {
    var self = this
    this.client1 = connect('client1', function() {
      self.client2 = connect('client2', done)
    })
  })

  afterEach(function(done) {
    var self = this
    this.client1.disconnect(null, function() {
      self.client2.disconnect(null, done)
    })
  })

  it('sends names', function(done) {
    this.client2.on('names', function(channel, nicks) {
      assert.equal(channel, '#test')
      assert.deepEqual(Object.keys(nicks), ['client1', 'client2'])
      done()
    })
  })

  it('sends message', function (done) {
    this.client1.say('#test', 'Hi there')

    this.client2.on('message#test', function(nick, text, message) {
      assert.equal(nick, 'client1')
      assert.equal(text, 'Hi there')
      done()
    })
  })
})
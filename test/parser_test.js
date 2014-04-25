var assert = require('assert'),
    Parser = require('../lib/parser').Parser

describe('Parser', function() {
  function assertParse(data, expectedRequests) {
    var actualRequests = []
    var parser = new Parser()

    parser.onRequest(function(command) {
      actualRequests.push(command)
    })

    parser.parse(data)

    assert.deepEqual(expectedRequests, actualRequests)
  }

  it('parse NICK', function () {
    assertParse("NICK ma\r\n", [{
      command: 'NICK',
      nick: 'ma'
    }])
  })
  
  it('parse USER', function () {
    assertParse("USER login 0 * :Full Name\r\n", [{
      command: 'USER',
      login: 'login',
      flags: '0',
      host: '*',
      fullName: 'Full Name'
    }])
  })

  it('parse JOIN', function () {
    assertParse("JOIN #channel\r\n", [{
      command: 'JOIN',
      channel: '#channel'
    }])
  })

  it('parse PRIVMSG', function () {
    assertParse("PRIVMSG #channel :Hi there!\r\n", [{
      command: 'PRIVMSG',
      channel: '#channel',
      message: 'Hi there!'
    }])
  })

  it('parse several request', function () {
    assertParse("NICK ma\r\nNICK ma\r\n", [
      { command: 'NICK', nick: 'ma' },
      { command: 'NICK', nick: 'ma' }
    ])
  })

  it('parse request after error', function () {
    assertParse("BAD ONE THAT IS\r\nNICK ma\r\n", [
      { command: 'NICK', nick: 'ma' }
    ])
  })
})
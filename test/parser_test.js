var assert = require('assert'),
    Parser = require('../lib/parser').Parser

describe('Parser', function() {
  function assertParse(data, expectedMessages) {
    var actualMessages = []
    var parser = new Parser()

    parser.onMessage(function(command) {
      actualMessages.push(command)
    })

    parser.parse(data)

    assert.deepEqual(expectedMessages, actualMessages)
  }

  it('parse NICK', function () {
    assertParse("NICK ma\r\n", [{
      command: 'NICK',
      nick: 'ma'
    }])
  })
  
  it('parse USER', function () {
    assertParse("USER username hostname.com server.com :Full Name\r\n", [{
      command: 'USER',
      username: 'username',
      hostname: 'hostname.com',
      servername: 'server.com',
      realname: 'Full Name'
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

  it('parse several messages', function () {
    assertParse("NICK ma\r\nNICK ma\r\n", [
      { command: 'NICK', nick: 'ma' },
      { command: 'NICK', nick: 'ma' }
    ])
  })

  it('parse message after error', function () {
    assertParse("BAD ONE THAT IS\r\nNICK ma\r\n", [
      { command: 'NICK', nick: 'ma' }
    ])
  })
})
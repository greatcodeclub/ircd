var User = require('../lib/user').User

exports.server = function() {
  return {
    name: 'test.local',
    log: function() {}
  }
}

exports.connection = function() {
  return {
    sent: [],
    write: function(data) { this.sent.push(data) }
  }
}

exports.user = function(nick) {
  var user = new User(exports.server(), exports.connection())
  user.nick = nick
  user.username = 'marc'
  user.hostname = 'ma.local'
  user.servername = 'server.com'
  user.realname = 'Marc-Andre Cournoyer'
  return user
}
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
  user.login = 'marc'
  user.flags = '0'
  user.host = 'ma.local'
  user.fullName = 'Marc-Andre Cournoyer'
  return user
}
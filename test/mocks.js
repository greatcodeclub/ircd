var User = require('../lib/user').User,
    Channel = require('../lib/channel').Channel

exports.server = function() {
  return {
    name: 'test.local',

    log: function() {},

    channels: {},
    getChannel: function(name) {
      return this.channels[name] = this.channels[name] || new Channel(name)
    }
  }
}

exports.connection = function() {
  return {
    sent: "",
    write: function(data) { this.sent += data },
    closed: false,
    end: function() { this.closed = true }
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
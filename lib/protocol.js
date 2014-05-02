exports.NICK = function(server, user, message) {
  user.nick = message.nick
}

exports.QUIT = function(server, user, message) {
  user.connection.end()
}
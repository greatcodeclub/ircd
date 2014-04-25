var net = require('net')

var server = net.createServer(function(connection) {
  connection.on('data', function(data) {
    console.log('Received: ' + data.toString())

    connection.write('By!\n')
    connection.end()
  })
})

server.listen(3000, function() {
  console.log('Ready for connections on port 3000')
})
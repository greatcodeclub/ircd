var net = require('net')

var server = net.createServer(function(connection) {
  connection.on('data', function(data) {
    var data = data.toString()

    console.log(data)
  })
})

server.listen(6667, function() {
  console.log("Started on port 6667")
})

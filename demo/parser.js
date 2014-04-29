var Parser = require('../lib/parser').Parser

var parser = new Parser()

// Each time a message is parsed, this callback is called.
parser.onMessage(function(message) {
  console.log(message)
})

console.log("Parsing NICK marc")
parser.parse("NICK marc\r\n")

console.log("Parsing JOIN #channel")
console.log("        QUIT")
parser.parse("JOIN #channel\r\nQUIT\r\n")
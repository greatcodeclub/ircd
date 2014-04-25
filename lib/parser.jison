// Parser for incoming requests to an IRC server.
//
// Based on https://tools.ietf.org/html/rfc2812
// And reverse engineering existing server and clients.

// Lexing rules
%lex

%%

\r?\n                 return 'CRLF'
\s                    // ignore spaces

// Commands
'NICK'                return 'NICK'
'USER'                return 'USER'
'JOIN'                return 'JOIN'
'PRIVMSG'             return 'PRIVMSG'
'QUIT'                return 'QUIT'

// Arguments
":"[^\r\n]+           return 'STRING' // string match everything until end of line
'#'\w+                return 'CHANNEL'
[^\s]+                return 'WORD'

<<EOF>>               return 'EOF'

/lex

// Parsing rules
%%

// Data received by the server can contain multiple requests.
data:
  requests EOF
;

requests:
  request
| requests request
;

request:
  // Instead of returning objects, we use a callback each time we match a request.
  command CRLF                  { yy.onRequest($1) }
  // `error` is for error recovery: http://dinosaur.compilertools.net/bison/bison_9.html#SEC81
  // If there's an error while parsing a command, this rule will catch it.
| error CRLF
;

command:
  NICK WORD                     { $$ = { command: $1, nick: $2 } }
| USER WORD WORD WORD string    { $$ = { command: $1, login: $2, flags: $3, host: $4, fullName: $5 } }
| JOIN CHANNEL                  { $$ = { command: $1, channel: $2 } }
| PRIVMSG CHANNEL string        { $$ = { command: $1, channel: $2, message: $3 } }
| QUIT                          { $$ = { command: $1 } }
;

string:
  STRING                        { $$ = $1.slice(1) }
;

%%
// Custom code added to the generated parser.

// Set the callback for when a request is parsed
parser.onRequest = function(callback) {
  this.yy.onRequest = callback
}

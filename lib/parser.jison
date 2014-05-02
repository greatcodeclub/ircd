// Parser for incoming messages to an IRC server.
//
// Based on:
// - https://tools.ietf.org/html/rfc2812
// - http://irchelp.org/irchelp/rfc/rfc.html
// - http://en.wikipedia.org/wiki/List_of_Internet_Relay_Chat_commands
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
\d                    return 'MODE'
[^\s]+                return 'WORD'

<<EOF>>               return 'EOF'

/lex

// Parsing rules
%%

// Data received by the server can contain multiple messages.
data:
  messages EOF
;

messages:
  message
| messages message
;

message:
  // Instead of returning objects, we use a callback each time we match a message.
  command CRLF                  { if (yy.onMessage) yy.onMessage($1) }
  // `error` is for error recovery: http://dinosaur.compilertools.net/bison/bison_9.html#SEC81
  // If there's an error while parsing a command, this rule will catch it.
| error CRLF
;

command:
// NICK <nickname>
   NICK any                      { $$ = { command: $1, nick: $2 } }

// USER <username> <hostname> <servername> <realname> (RFC 1459)
|  USER any WORD any string      { $$ = { command: $1, username: $2, hostname: $3, servername: $4, realname: $5 } }
// USER <user> <mode> <hostname> <realname> (RFC 2812)
|  USER any MODE any string      { $$ = { command: $1, username: $2, mode: $3, hostname: $4, realname: $5 } }

// JOIN <channel>
|  JOIN CHANNEL                  { $$ = { command: $1, channel: $2 } }

// PRIVMSG <msgtarget> <message>
|  PRIVMSG CHANNEL string        { $$ = { command: $1, channel: $2, message: $3 } }

// QUIT [<message>]
|  QUIT                          { $$ = { command: $1 } }
|  QUIT string                   { $$ = { command: $1, message: $2 } }
;

// :String with spaces
string:
   STRING                        { $$ = $1.slice(1) }
;

// Any type of argumebnts
any:
  WORD
| CHANNEL
| MODE
;

%%
// Custom code added to the generated parser.

// Set the callback for when a message is parsed
parser.onMessage = function(callback) {
  this.yy.onMessage = callback
}

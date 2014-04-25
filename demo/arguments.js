var _ = require('underscore')

function logArguments(arg1) {
  // Get all the arguments passed to a function using `arguments`.
  console.log({ arg1: arg1, "arguments[0]": arguments[0] })

  // `arguments` is not an array
  // console.log(arguments.slice(1))
  console.log(_.toArray(arguments).slice(1))
}

logArguments("arg #1", "arg #2", "arg #3")
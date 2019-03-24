const Valid = require('is-my-json-valid')
const getContent = require('ssb-msg-content')

const publication = require('./tamaki-publication')

module.exports = {
  isPublication: Validator(publication)
}

// TODO improve this :
//   - versioning
//   - errors
function Validator (schema) {
  const validator = Valid(schema)

  return function (msg) {
    return validator(getContent(msg))
  }
}

const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type'],
  properties: {
    type: {
      type: 'string',
      pattern: '^tamaki:publication$'
    },
    img: { $ref: '#/definitions/blobId' },
    title: { type: 'string' },
    description: { type: 'string' }
  },
  definitions
}

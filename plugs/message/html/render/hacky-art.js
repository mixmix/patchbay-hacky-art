const h = require('mutant/h')
const nest = require('depnest')
const getContent = require('ssb-msg-content')
const { isPublication } = require('../../../../schemas')

exports.needs = nest({
  'blob.sync.url': 'first',
  'message.html.layout': 'first',
  'message.html.decorate': 'reduce'
})

exports.gives = nest({
  'message.html.render': true
})

exports.create = function (api) {
  return nest({
    'message.html.render': renderGathering
  })

  function renderGathering (msg, opts) {
    if (!isPublication(msg)) return

    const element = api.message.html.layout(msg, Object.assign({}, {
      content: Publication(msg),
      layout: 'default'
    }, opts))

    return api.message.html.decorate(element, { msg })
  }

  function Publication (msg) {
    const { img, title, description } = getContent(msg)

    return h('HackyArt', [
      h('img', { src: api.blob.sync.url(img) }),
      h('h3', title),
      h('p', description)
    ])
  }
}

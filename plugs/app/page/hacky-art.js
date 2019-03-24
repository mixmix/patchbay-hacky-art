const nest = require('depnest')
const pull = require('pull-stream')
const { h } = require('mutant')
const Scroller = require('pull-scroll') // TODO replace with mutant-scroll ??

exports.gives = nest({
  'app.html.menuItem': true,
  'app.page.hackyArt': true
})

exports.needs = nest({
  'app.html.scroller': 'first',
  'message.html.render': 'first',
  'sbot.pull.stream': 'first'
})

exports.create = function (api) {
  return nest({
    'app.html.menuItem': menuItem,
    'app.page.hackyArt': hackyArtPage
  })

  function menuItem (handleClick) {
    return h('a', {
      style: { order: 0 },
      'ev-click': () => handleClick({ page: 'hackyArt' })
    }, '/hackyArt')
  }

  function hackyArtPage (path) {
    const { container, content } = api.app.html.scroller({
      prepend: h('h1', 'Hacky~Art')
    })

    // extract ?
    const source = opts => api.sbot.pull.stream(server => {
      const _opts = Object.assign({
        query: [{
          $filter: {
            value: {
              timestamp: { $gt: 0 },
              content: { type: 'tamaki:publication' }
            }
          }
        }]
      }, opts)

      return server.query.read(_opts)
    })

    pull(
      source({ reverse: true }),
      Scroller(container, content, api.message.html.render, false, false)
    )

    pull(
      source({ old: false }),
      Scroller(container, content, api.message.html.render, true, false)
    )

    container.title = '/hackyArt'
    container.classList.add('HackyArt')
    return container
  }
}

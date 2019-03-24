const nest = require('depnest')

exports.gives = nest('router.sync.routes')

exports.needs = nest({
  'app.page.hackyArt': 'first'
})

exports.create = (api) => {
  return nest('router.sync.routes', (sofar = []) => {
    const pages = api.app.page

    // loc = location
    const routes = [
      [ loc => loc.page === 'hackyArt', pages.hackyArt ],
      [ loc => loc.page === 'hacky-art', pages.hackyArt ]
    ]

    return [...routes, ...sofar]
  })
}

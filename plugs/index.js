const plugs = {
  app: {
    page: {
      hackyArt: require('./app/page/hacky-art')
    }
  },
  message: {
    html: {
      render: {
        hackyArt: require('./message/html/render/hacky-art')
      }
    }
  },
  router: {
    sync: {
      routes: require('./router/sync/routes')
    }
  },
  styles: {
    mcss: require('./styles/mcss')
  }
}

module.exports = {
  'patchbay-hacky-art': plugs
}

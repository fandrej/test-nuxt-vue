/*
https://ru.nuxtjs.org/guide/configuration
https://ru.nuxtjs.org/guide/directory-structure/
https://ru.nuxtjs.org/examples/custom-routes
*/
module.exports = {
  /*
  ** Server config
  */
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'project-symmetrica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },    // head
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Plugins
  */
  plugins: [
    '~plugins/globals.js'   // load & register components for all pages visibility
  ],
  modules: [
    '@nuxt/http',   // HTTP GET data from remote servers instead of fetch/ajax (fuck CORSE headers)
    'bootstrap-vue/nuxt',
  ],
  router: {
    middleware: 'loader',   // Run the middleware/loader.js on every page
    // Add Dynamic Nested Routes with many levels and one page
    // The * (asterisk) NOT matching "whatever", the manuals lie!
    extendRoutes (routes, resolve) {
        let i, removed = null;
        for (i = 0; i < routes.length; i++) {
            if( routes[i].name == 'all' && routes[i].path == '/*')
                removed = routes.splice(i, 1);
        }
        // 10 levels of the categories, 2 url for one category: /catalog and /catalog/ is equal
        let p = '/catalog'; // already exists by catalog.vue exists
        for(i = 0; i < 21; i++){
            p += (i % 2 ? '*' : '/');
            routes.push({path: p, component: 'pages/catalog.vue'});
        }
        // Add "all" "/*" to last
        if( removed.length ) {
            routes.push(removed[0]);
        }
    }   // extendRoutes
  },    // router
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    /*
    ** Add component name to array transpile when get error Unexpected token '<'
    transpile: [/^vue-dynamic-dropdown($|\/)/],
    */
  }
}


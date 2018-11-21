module.exports = {
  mode: 'spa',

  env: {
    RFT_CONTRACT_ADDRESS: process.env.RFT_CONTRACT_ADDRESS,
  },

  head: {
    title: 'Reforestum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'http://fonts.googleapis.com/icon?family=Material+Icons',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
  },

  loading: { color: '#3B8070' },

  srcDir: 'client/',

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  modules: ['nuxt-buefy'],

  plugins: [{ src: '~/plugins/rft', ssr: false }],
};

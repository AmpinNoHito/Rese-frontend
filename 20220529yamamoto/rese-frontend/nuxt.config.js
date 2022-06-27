export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Rese',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {src : "~/assets/scss/_reset.scss"},
    {src : "~/assets/scss/_common.scss"},
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/utils',
    '~/plugins/errors',
    '~/plugins/imageProcessing',
    '~/plugins/modal',
    '~/plugins/persistedstate',
    '~/plugins/vue-qrcode-reader',
    '~/plugins/vue-stripe',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    credentials: true,
    baseURL: process.env.API_URL,
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
        token: {
          property: "token",
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post', propertyName: 'token' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user'},
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


  // スタイル用変数、mixinの読み込み
  styleResources: {
    scss: [
      '~/assets/scss/resources/_variables.scss',
      '~/assets/scss/resources/_mixin.scss',
    ],
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:8000',
    storageUrl: process.env.STORAGE_URL || 'http://localhost:8000/storage/images',
    stripePK: process.env.STRIPE_PK,
  },

  env: {
    STRIPE_PK: process.env.STRIPE_PK,
  }
}

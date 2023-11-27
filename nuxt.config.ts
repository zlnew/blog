// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{
        name: 'google-adsense-account',
        content: 'ca-pub-6360316091582539'
      }],
      script: [{
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6360316091582539',
        crossorigin: 'anonymous'
      }]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
       process.env.NODE_ENV === 'production'
         ? { preset: ['default', { discardComments: { removeAll: true } }] }
         : false
    }
  },
  devtools: { enabled: true },
  runtimeConfig: { public: { APP_URL: process.env.APP_URL } },
  imports: { dirs: ['stores'] },
  components: [{
    path: '~/components/article-list',
    pathPrefix: false
  }, '~/components'],
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-gtag'
  ],
  gtag: { id: process.env.GTAG_ID },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: "Aprizqy's Blog",
      short_name: "Aprizqy's Blog",
      icons: [{
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }, {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }],
      theme_color: '#030712',
      background_color: '#f8fafc',
      display: 'standalone'
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: process.env.NODE_ENV !== 'production' ? 60 : 3600
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/*']
    }
  },
  ui: {
    icons: [
      'mdi',
      'heroicons',
      'material-symbols'
    ]
  },
  colorMode: { preference: 'dark' },
  googleFonts: { families: { Roboto: true, 'Roboto Slab': true } },
  eslint: { lintOnStart: false },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
  },
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
      'acceptHMRUpdate'
    ]
  }
})

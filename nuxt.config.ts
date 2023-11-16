// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  // devServer: {
  //   host: '192.168.11.121'
  // },
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      APP_URL: process.env.APP_URL
    }
  },
  imports: {
    dirs: ['stores']
  },
  components: [
    {
      path: '~/components/article-list',
      pathPrefix: false
    },
    '~/components'
  ],
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: "Aprizqy's Blog",
      short_name: "Aprizqy's Blog",
      theme_color: '#030712',
      icons: [{
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
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
  colorMode: {
    preference: 'light'
  },
  googleFonts: {
    families: {
      Lato: true
    }
  },
  eslint: {
    lintOnStart: false
  },
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      APP_URL: 'http://localhost:3000'
    }
  },
  imports: {
    dirs: ['stores']
  },
  components: [
    {
      path: '~/components/articles',
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
      short_name: 'AB',
      theme_color: '#030712',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
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
    url: 'https://gwhrpqivqlkuttxtthkg.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aHJwcWl2cWxrdXR0eHR0aGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NTQ5NTIsImV4cCI6MjAxNDIzMDk1Mn0.rlWphzbf6vd2xFG7vqUSQyU0chE_1iUD73ypCerVXrY',
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
    preference: 'system'
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

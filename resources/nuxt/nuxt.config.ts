// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '192.168.11.121'
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
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
    {
      path: '~/components/forms',
      pathPrefix: false
    },
    '~/components'
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-disqus'
  ],
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
    autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
  },
  disqus: {
    shortname: 'aprizqy-blog'
  }
})

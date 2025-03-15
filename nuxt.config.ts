// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_ENV: process.env.NUXT_PUBLIC_API_ENV || 'localhost',
    },
  },
  vite: {
    envPrefix: ['NUXT_', 'VITE_'], // This is usually the default
  },
  app: {
    baseURL: process.env.BASE_URL || '/', // default is root
  },
  nitro: {
    preset: 'node-server',
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});

import { createApp, render, h, provide } from 'vue'
import App from './App.vue'
import { apolloClient } from '@/apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'

import './assets/base.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.mount('#app')

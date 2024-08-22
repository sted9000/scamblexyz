import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports'
import './assets/tailwind.css'

Amplify.configure(awsconfig)
createApp(App).use(router).mount('#app')

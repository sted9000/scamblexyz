import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createPinia } from 'pinia';
import {Amplify} from 'aws-amplify';
import awsconfig from "@/aws-exports";

Amplify.configure(awsconfig);
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

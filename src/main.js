import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import vue3GoogleSignin from "vue3-google-signin";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vue3GoogleSignin, {
  clientId:
    "8603217298-qfgbrgiicgsv09qmknnfe9eir0sk2sqo.apps.googleusercontent.com",
});

app.mount("#app");

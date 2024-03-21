import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import i18n from './i18n';
import pinia from './store';

import 'virtual:uno.css'
import "./assets/main.css"
import '@unocss/reset/tailwind.css'


const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(pinia);
app.mount("#app");
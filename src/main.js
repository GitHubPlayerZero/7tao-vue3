import "@/assets/scss/all.scss";

// Bootstrap
import "bootstrap";

// vue-loading-overlay
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(LoadingPlugin); // vue-loading-overlay

app.mount("#app");

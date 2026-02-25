import "@/assets/scss/all.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

// Bootstrap
import "bootstrap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// vue-loading-overlay
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

// VeeValidate
import { Field, Form, ErrorMessage } from "vee-validate";
import { VeeValidateHelper } from "./helpers";
VeeValidateHelper.initEnv();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Pinia 持久化

const app = createApp(App);
app.use(pinia);
app.use(router);

// vue-loading-overlay
app.use(LoadingPlugin);

// 註冊 VeeValidate 元件
app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("VeeErrorMessage", ErrorMessage);

app.mount("#app");

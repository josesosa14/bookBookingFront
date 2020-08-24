import "@babel/polyfill";
import "mutationobserver-shim";

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

store.dispatch("auth/getUser");

axios.interceptors.response.use(
  response => {
    if (response.data.success) {
      store.commit("setAlertMessage", { type: 'success', message: response.data.success });
    } else if (response.data.danger) {
      store.commit("setAlertMessage", { type: 'danger', message: response.data.danger });
    }
    return response;
  },
  error => {
    if (error.response.status === 422 || error.response.status === 429) {
      store.commit("setErrors", error.response.data.errors);
    } else if (error.response.status === 401) {
      store.commit("auth/setUser", null);
      router.push({ name: "Login" });
    } else {
      return Promise.reject(error);
    }
  }
);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

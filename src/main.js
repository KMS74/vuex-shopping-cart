import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { currency } from "@/filters/currency.js";

Vue.config.productionTip = false;
// global filter
Vue.filter("currency", currency);
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

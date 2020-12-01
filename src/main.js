import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vue-flipper/dist/vue-flipper.css";
import Flipper from "vue-flipper";

Vue.component("Flipper", Flipper);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vue-flipper/dist/vue-flipper.css";
import Flipper from "vue-flipper";
import VueGtag from "vue-gtag";

Vue.component("Flipper", Flipper);

Vue.use(VueGtag, {
  config: { id: "G-H3BLP3MTNK" },
  enabled: process.env.NODE_ENV != "development"
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

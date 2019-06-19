import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/css/reset.css";
import axios from "axios";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
axios.defaults.baseURL = "http://127.0.0.1:7001";
Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.config.productionTip = false;

Vue.use(antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

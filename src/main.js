
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import $ from 'jquery'
import echarts from 'echarts'
import api from './api.js'
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
import dateFns from 'date-fns';
Vue.prototype.dateFns = dateFns;
// Vue.prototype.path = "http://172.30.128.32:8081/aio/"
Vue.prototype.path = "http://aio.sunwoda.com/aio/"
Vue.prototype.api = api
function onDeviceReady() {
  console.log("navigator.geolocation works well");
}

document.addEventListener("deviceready", onDeviceReady, false);
Vue.use(YDUI);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

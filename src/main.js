import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import '../uikit/index'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import CKEditor from 'ckeditor4-vue';




// register globally
Vue.component('multiselect', Multiselect)



Vue.use(BootstrapVue)
Vue.use( CKEditor );





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

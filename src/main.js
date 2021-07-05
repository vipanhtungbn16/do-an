import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'boxicons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import { VclTable } from 'vue-content-loading'

import '../uikit/index'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import CKEditor from 'ckeditor4-vue';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



// register globally
Vue.component('multiselect', Multiselect)
Vue.component('VclTable', VclTable)



Vue.use(BootstrapVue)
Vue.use( CKEditor );





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

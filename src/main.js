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
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay,Navigation } from 'swiper/core'

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// Swiper modules
SwiperClass.use([Pagination, Mousewheel, Autoplay,Navigation])

// -------------------------------------------------

// Global use
Vue.use(getAwesomeSwiper(SwiperClass))
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)




// register globally
Vue.component('multiselect', Multiselect)
Vue.component('VclTable', VclTable)





Vue.use(BootstrapVue)
Vue.use( CKEditor );

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  position: "top-right",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
});



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

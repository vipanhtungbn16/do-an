import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  { path: '/admin/product',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Product"),
    name:'product',
    meta: { transitionName: 'slide' },
  },
  { path: '/admin/product/add',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/AddProduct"),
    name:'add-product',
    meta: { transitionName: 'slide' },
  },
  { path: '/admin/overview',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Overview"),
    name:'overview',
    meta: { transitionName: 'slide' },

  },
  { path: '/admin/category',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Category"),
    name:'category'
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

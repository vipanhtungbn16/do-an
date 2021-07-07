import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthService from "../helper/authService";

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
  { path: '/login',component: () =>
        import(/* webpackChunkName: "about" */ "../views/client/Login"),
    name:'login',
    meta: { transitionName: 'slide',layout:'client' },
  },
  { path: '/dashboard',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/Login"),
    name:'admin',
    meta: { transitionName: 'slide',layout:'admin' },
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
    name:'category',
    meta: { transitionName: 'slide' },
  },
  { path: '/admin/category/:id',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/DetailCategory"),
    name:'category-detail',
    meta: { transitionName: 'slide' },
  },
  { path: '/admin/category/add',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/AddCategory"),
    name:'add-category'
  },
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next)=>{
  if(to.fullPath.includes('/admin/') && !AuthService.isAuthenticated()){
     next({path:'/dashboard'});
  }else {
    next();
  }

})
export default router;

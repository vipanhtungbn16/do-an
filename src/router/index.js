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
    meta: {layout:'client' }
  },
  { path: "*", component: Home, meta: {layout:'client' } },
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
  {
    path: "/product/:id",
    name: "Detail",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/client/DetailProduct"),
    meta: {layout:'client' }
  },
  {
    path: "/c",
    name: "ProductCategory",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/client/CategoryProduct"),
    meta: {layout:'client' }
  },
  { path: '/dashboard',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/Login"),
    name:'admin',
    meta: { transitionName: 'slide',layout:'admin' },
  },
  { path: '/admin/product',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Product"),
    name:'product',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/product/detail/:id',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/DetailProduct.vue"),
    name:'product-detail',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/product/add',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/AddProduct"),
    name:'add-product',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/overview',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Overview"),
    name:'overview',
    meta: { transitionName: 'slide',layout:'default' },

  },
  { path: '/admin/category',component: () =>
        import(/* webpackChunkName: "about" */ "../views/Category"),
    name:'category',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/category/:id',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/DetailCategory"),
    name:'category-detail',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/category/add',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/AddCategory"),
    name:'add-category',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/department',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/Department"),
    name:'department',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/department/add',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/AddDeparment"),
    name:'add-department',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/department/:id',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/DetailDepartment"),
    name:'department-detail',
    meta: { transitionName: 'slide',layout:'default' },
  },
  { path: '/admin/upload-file',component: () =>
        import(/* webpackChunkName: "about" */ "../views/admin/UploadFile"),
    name:'uploaded',
    meta: { transitionName: 'slide',layout:'default' },
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

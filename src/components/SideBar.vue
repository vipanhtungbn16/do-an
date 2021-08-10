<template>
  <div class="sidebar" :class="{expander:isOpenSideBar || hoverIndex >= 0  }" id ="navbar">
      <nav class="nav" >
        <div @click="toggleSideBar" class="nav__brand">
          <box-icon name='menu' color="#ffffff" class = "nav__toggle" id="nav-toggle" ></box-icon>
          <a class="nav__logo" href="#">HONO</a>
        </div>
        <div class="nav__list">
          <div v-for="(item,i) in menus" :key="i"  @mouseover="onHover(i)"
               @mouseout="onHover(-1)" class="nav__item" :class="{active: isActive(item.route) || childrenNameRoute(item.title)
      ,hover: hoverIndex === i,}">
            <router-link class="nav__link" :to="item.route">
              <i :class="item.class"  class = "nav__toggle" id="nav-toggle" ></i>
              <span class="nav__name">{{item.title}}</span>
            </router-link>
          </div>

        </div>
      </nav>
  </div>
</template>

<script>
export default {
  name:'SideBar',
  data(){
    return{
      isOpenSideBar:true,
      hoverIndex: -1,
      menus:[
        {
          title: 'Dashboard',
          class: 'fas fa-chart-line',
          route: {name:'overview'},
        },
        {
          title: 'Product',
          class: 'fas fa-tshirt',
          route:  {name:'product'},
        },
        {
          title: 'Category',
          class: 'fas fa-list-alt',
          route: {name:'category'},
        },
        {
          title: 'Department',
          class: 'fas fa-restroom',
          route: {name:'department'},
        },
        {
          title: 'User',
          class: "fas fa-user-tie",
          route: '/',
        },
      ]
    }
  },
  methods:{
    toggleSideBar(){
      this.isOpenSideBar = !this.isOpenSideBar
      this.$emit('isOpenSideBar',this.isOpenSideBar)
    },
    isActive(route) {
      if (typeof (route) == 'object') {
        return this.$route.name === route.name
      }

      return this.$route.path === route || this.$route.fullPath === route
    },
    childrenNameRoute(title) {
      let fullPath = this.$route.fullPath
      let title1 = title
      if (title1 != null) {
        title1 = title1.toLowerCase()
        if (fullPath.includes(title1)) {
          return true
        }
      }
      return false
    },
    onHover(i) {
   this.hoverIndex = i
    },
  }
}
</script>
<style>
.nav__toggle{
  width: 20px !important;
  max-width: 20px;
}
</style>
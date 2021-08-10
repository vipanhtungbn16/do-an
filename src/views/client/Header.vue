<template>
<div class="header" :class="{'on-scroll':scrollPosition > 100}">
  <div class="header__logo">
    <router-link to="/">
      <img src="@/assets/img/logo.svg">
    </router-link>
  </div>
  <ul class="header__menu">
    <li class="header__menu-item">NAM</li>
    <li class="header__menu-item">NỮ</li>
  </ul>
  <div class="header__user">
    <div class="header__user-item">
      <img src="@/assets/img/search.svg">
    </div>
    <div class="header__user-item">
      <img src="@/assets/img/user.svg">
    </div>
    <div class="header__user-item">
      <img src="@/assets/img/cart.svg">
    </div>
  </div>
</div>
</template>
<script>
export default {
  name:'Header',
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  data(){
    return{
      scrollPosition: null
    }
  },
  methods:{
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>
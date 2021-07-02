<template>
  <div  id="app" >
    <component :is="layout">
      <router-view :key="$route.name"></router-view>
    </component>

  </div>
</template>

<script>


export default {
  name:'App',
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`
    },
  },
  components: {
    'default-layout': () => import('./views/Dashboard'),
    'admin-layout' :() =>import('./views/admin/Login'),
    'client-layout' :() =>import('./views/client/Index'),
  },
}
</script>
<style lang="scss">
#app {
  font-family:'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}


</style>

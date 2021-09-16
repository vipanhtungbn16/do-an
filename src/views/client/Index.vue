<template>
  <div class=" h-100 layout__client d-flex">
    <div class="flex-grow-1">
      <div class="h-100">
<!--        <PageLoad/>-->
        <Header/>
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./Header";
// import PageLoad from "../../components/PageLoad";
export default {
  name:'Index',
  components:{Header},
}
</script>
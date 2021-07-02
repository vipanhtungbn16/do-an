<template>
  <div class=" h-100 layout__client d-flex">
    <div class="flex-grow-1">
      <div class="h-100">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Index'
}
</script>
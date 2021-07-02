<template>
  <div class="dropdown__item" @click="doFunc">
    <slot />
  </div>
</template>
<script>

export default {
  name: 'PItem',
  props: {
  },
  methods: {
    doFunc() {
      this.$parent.callToClose()
    }
  }
};
</script>
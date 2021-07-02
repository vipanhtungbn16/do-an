<template>
    <div class="dropdown" :id="id">
      <div class="dropdown__btn" @click="isOpen = !isOpen" :class="{ isActive: isOpen }">
        <slot name="trigger"/>
      </div>
      <transition name="dropdown">
      <div class="dropdown__list" v-if="isOpen">
        <slot></slot>
      </div>
      </transition>

    </div>
</template>
<script>
export default {
  name:'PDropdown',
  components: {

  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    window.addEventListener('click', this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.checkClickOn);
  },
  props: {
    arrays: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    callToClose() {
      this.isOpen = false;
    },
    checkClickOn(event) {
      if (!document.getElementById(this.id).contains(event.target)) {
        this.isOpen = false;
      }
    },

  },
}
</script>
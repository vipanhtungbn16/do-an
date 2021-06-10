<template>
  <div class="dashboard" :class="{'sidebar-open':isOpenSideBar}">
    <sidebar @isOpenSideBar =handleOpen ></sidebar>
    <navbar></navbar>
    <transition :name="transitionName"
                mode="out-in"
                @beforeLeave="beforeLeave"
                @enter="enter"
    >
      <router-view :key="$route.path"></router-view>
    </transition>
  </div>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
import Navbar from "../components/Navbar";
const DEFAULT_TRANSITION = 'fade';

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      isOpenSideBar: true,
      transitionName: DEFAULT_TRANSITION,
      prevHeight: 0,
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
      this.transitionName = transitionName || DEFAULT_TRANSITION;
      next();
    });
  },
  methods: {
    handleOpen(bl) {
      this.isOpenSideBar = bl
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      // const { height } = getComputedStyle(element);

      element.style.height = '100%';

      // setTimeout(() => {
      //   element.style.height = height;
      // });
    },
  }
}
</script>


<template>
  <div class="home">
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide >
        <img class="swiper-item" src="@/assets/img/banner.jpg" >
      </swiper-slide>
      <swiper-slide >
        <img class="swiper-item" src="@/assets/img/banner2.jpg" >
      </swiper-slide>
      <swiper-slide >
        <img class="swiper-item" src="@/assets/img/banner3.jpg" >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <div class="grid wide">
      <div class="row sm-gutter department">
        <div class="department__item">

        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "Home",
  data(){
    return{
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
      },

    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
}
</script>

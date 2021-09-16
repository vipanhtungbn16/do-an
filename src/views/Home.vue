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

    <div class="grid">
      <div class=" sm-gutter department">
        <div class="department__item">
          <img class="department__item-img" src="@/assets/img/HIM-1-scaled.jpg" >
        </div>
        <div class="department__item">
          <img class="department__item-img" src="@/assets/img/HER-scaled.jpg" >
        </div>
      </div>
      <div class="new__product">
        <h1 class="new__product-title">SẢN PHẨM MỚI NHẤT</h1>
        <div class="new__product-sex">For Him</div>
        <swiper ref="mySwiper" class="swiper" :options="swiperOptionSex">
          <swiper-slide
          v-for="(item,i) in menSlide"
          :key="i"
          >
            <div class="product__container">
              <router-link :to="{
                name:'Detail',
                params:{
                  id:item._id
                }
              }" class="product__container-link">
                <img  class="product__container-img" v-if="item.image" v-lazy="item.image[0]" />
              </router-link>
              <div class="product__container-info">
                <p class="product__container-name">{{item.name | uppercase}} </p>
                <span class="product__container-price" v-if="item.varians">{{item.varians[0].price | formatPrice}}</span>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="new__product-sex">For Her</div>
        <swiper ref="mySwiper" class="swiper" :options="swiperOptionSex">
          <swiper-slide
              v-for="(item,i) in womamSlide"
              :key="i"
          >
            <div class="product__container">
              <a class="product__container-link">
                <img class="product__container-img" v-if="item.image" v-lazy="item.image[0]" />
              </a>
              <div class="product__container-info">
                <p class="product__container-name">{{item.name | uppercase}} </p>
                <span class="product__container-price" v-if="item.varians">{{item.varians[0].price | formatPrice}}</span>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>


    </div>
  </div>
</template>


<script>
import {GET_PRODUCT_BY_SLUG} from "../store/modules/product";
import {mapActions} from 'vuex'
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
      swiperOptionSex:{
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      menSlide:[],
      womamSlide:[]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
  this.init()
    },
  methods:{
    ...mapActions('product',[GET_PRODUCT_BY_SLUG]),
    async init(){
      const menProduct = await this[GET_PRODUCT_BY_SLUG]({slug:'Nam',page:1,limit:10})
      const womanProduct = await this[GET_PRODUCT_BY_SLUG]({slug:'Nu',page:1,limit:10})
      if(!menProduct || !womanProduct){
        this.$toast.success('Opp!Somethings went wrong', {
          position: "top-right",
        })
      }
      this.menSlide = menProduct.products
      this.womamSlide = womanProduct.products
    }
  }
}
</script>

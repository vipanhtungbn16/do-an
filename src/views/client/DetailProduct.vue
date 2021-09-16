<template>
  <div class="product__detail">
    <div class="product__detail-info">
      <img ref="mainContainer" @mouseleave="removeReac" :src="img" @mousemove="move" >
      <div class="rect" :class="{'rect-active':activeReac}" ref="rect"></div>
      <div  class="zoom" :class="{'rect-active':activeReac}" ref="zoom"></div>
    </div>
    <div class="product__detail-filter">
      <div class="product__info">
        <h3 class="product__info-name">{{detailProdct.name}}</h3>
        <div class="product__info-price">
          {{price | formatPrice}}
        </div>
      </div>
      <div class="product__varian">
        <div class="product__varian-group">
          <div class="product__varian-title">Chọn màu:{{optionColor.name}}</div>
          <div class="product__varian-wrapper">
            <div v-for="(item,i) in detailProdct.color" :key="i" :class="{active:selected(i)}"  class="product__varian-item">
              <div @click="selectColor(item,i)" class="product__varian-color" :style="{backgroundColor:item.hex}"></div>
            </div>
          </div>
        </div>
        <div class="product__varian-group">
          <div class="product__varian-wrapper">
            <div v-for="(item,i) in optionVarian" :class="{active:selectedVarian(i)}" :key="i" class="product__varian-item">
              <img @click="selectOption(item,i)" v-lazy="item.image">
            </div>
            <div v-for="(item,j) in detailProdct.image"  :key="'image'+j" :class="{active:selectedImg(j)}" class="product__varian-item">
              <img @click="selectImage(item,j)" v-lazy="item">
            </div>
            </div>
        </div>
        <div class="product__varian-group">
          <div class="product__varian-title">Chọn size:</div>
          <div class="product__varian-wrapper">
            <div v-for="(item,i) in optionVarian" :class="{active:selectedSize(i)}" :key="i"  class="product__varian-item">
                <span style="font-size: small" @click="selectSize(item,i)">{{item.size}}</span>
            </div>

          </div>
        </div>

      </div>
      <div class="product__varian-add">
        <button class="btn">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
</template>
<script>
import {GET_DETAIL_PRODUCT} from "../../store/modules/product";
import {mapActions,mapState} from 'vuex'

export default {
  name:'DetailProduct',
  data(){
    return{
      optionColor:{},
      optionSize:"",
      itemActive:0,
      varianActive:0,
      activeSize:0,
      imgActive:null,
      componentLoaded: false,
      data:{},
      price:0,
      img:'',
      ratio:3,
      x:0,
      xx:0,
      y:0,
      yy:0,
      activeReac:false,
    }
  },
  methods:{
    ...mapActions('product',[GET_DETAIL_PRODUCT]),
    async init(){
      const {id} = this.$route.params
     const result =  await this[GET_DETAIL_PRODUCT](id)
      if(!result.success){
        this.$toast.error(result.message, {
          position: "top-right",
        })
        return
      }
     this.componentLoaded = true
      if(this.detailProdct.color){
        this.selectColor(this.detailProdct.color[0],0)
        this.selectOption(this.optionVarian[0],0)
        this.selectSize(this.optionVarian[0],0)
      }
    },
    selectOption(item,i){
      var zoom = this.$refs.zoom
      this.varianActive = i
      this.img = item.image
      this.imgActive = null
      zoom.style.backgroundImage = "url(" + this.img + ")"
    },
    selectImage(item,i){
      var zoom = this.$refs.zoom
      this.varianActive = i
      this.imgActive = i
      this.img = item
      this.varianActive = null
      zoom.style.backgroundImage = "url(" + this.img + ")"
    },
    selectColor(item,i){
      this.optionColor = item
      this.price = this.optionVarian[0].price
      this.itemActive = i
      this.activeSize = 0
      this.varianActive = 0
      this.imgActive = null
    },
    selectSize(item,i){
      this.optionSize = item.size
      this.price = item.price
      this.activeSize = i
    },
    selected(i){
      return this.itemActive == i
    },
    selectedVarian(i){
      return this.varianActive == i
    },
    selectedSize(i){
      return this.activeSize == i
    },
    selectedImg(i){
      return this.imgActive == i
    },
    move(e){
      this.activeReac = true
    var w2 =this.$refs.rect.offsetWidth
     var  h2 =this.$refs.rect.offsetHeight
      var zoom = this.$refs.zoom
      let w1 = this.$refs.mainContainer.offsetWidth;
      let h1 =this.$refs.mainContainer.offsetHeight;
      zoom.style.backgroundSize = w1 * this.ratio + 'px'  + ' ' + h1 * this.ratio + 'px'
      zoom.style.zIndex = 9
      w2 = w2/2;
      h2 = h2/2;
      this.x = e.offsetX
      this.y = e.offsetY
      this.xx = this.x - w2;
      this.yy = this.y - h2;
      // Keeping the selector inside the main picture
      // left of picture
      if (this.x < w2) {
        this.x = w2;
        // matching the zoom window with the selector
        this.xx = 0;
      }
      // right of main picture
      if (this.x > w1 - w2) {
        this.x = w1 - w2;
        this.xx = this.x - w2;
      }
      // top of main picture
      if (this.y < h2) {
        this.y = h2;
        this.yy = 0;
      }
      // bottom of main picture
      if (this.y > h1 - h2) {
        this.y = h1 - h2;
      }
      this.xx =  (this.xx *  this.ratio);
      this.yy =  this.yy *  this.ratio;
      this.$refs.rect.style.left = this.x + 'px'
      this.$refs.rect.style.top = this.y + 'px'
      // changing background image of zoom window
      this.$refs.zoom.style.top = this.y - 100  + 'px'
      zoom.style.backgroundPosition = '-' + this.xx + 'px ' + '-' + this.yy  + 'px';
    },
    removeReac(){
      var zoom = this.$refs.zoom
      this.activeReac = false
      zoom.style.zIndex = 0
    }
  },
  mounted() {
    this.init()
    },
  computed:{
    ...mapState('product',{
      detailProdct:state => state.product
    }),
    optionVarian(){
      if (!this.componentLoaded) {
        return
      }
      let temp = this.detailProdct.varians
      temp = this.detailProdct.varians.filter(item =>
        item.hex == this.optionColor.hex
      );
      return temp
    },

  }

}
</script>

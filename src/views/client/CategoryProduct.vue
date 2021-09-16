<template>
  <div class="category__page">
    <div class="breadcum">
      <div class="breadcum__item">
        <router-link to="/">
          Trang chủ
        </router-link>
      </div>
      <div class="breadcumm__item" v-for="(item,i) in ">

      </div>
    </div>
    <div class="category__page-list ">
      <h3>{{name}}</h3>
      <p>{{description}}
      </p>
    </div>
    <div class="category__page-body mt-4">
      <div class="category__filter">
        <div class="category__filter-btn">
          <button class="btn">GIÁ THẤP NHẤT</button>
          <button class="btn">CÓ ƯU ĐÃI</button>
        </div>
        <div class="category__filter-list">
          <div class="group" v-for="(group, name) in groups" :key="name">
            <a class="group-name" :class="{active:group.open}"  @click="group.open = !group.open">
              {{group.name}}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 17"><path d="M.5.5L8 8.56.5 16.5"/></svg>
            </a>
            <ul class="group-list" v-show="group.open">
              <li class="group-item" v-for="(item,i) in group.items"  :key="i">
                <input hidden class="group-input"  type="checkbox" :id="item" />
                <label :for="item" class="group-label">{{item}}  </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="category__preview">
        asdadas
      </div>
    </div>
  </div>
</template>
<script>
var groups = {
  "GROUP A": {
    "name": "Màu sắc",
    "open": false,
    "items": [
      "item 1"
    ]
  },
  "GROUP B": {
    "name": "Kích cỡ quần/áo",
    "open": false,
    "items": [
      "item 1",
      "item 2",
      "item 3",
      "item 4",
      "item 5",
      "item 6",
      "item 7"
    ]
  },
}
import  minxinRouter from "../../minxis/route"
import {mapActions,mapState} from 'vuex'
import { GET_PRODUCT_BY_SLUG} from "../../store/modules/product";
export default {
  name:'CategoryProduct',
  mixins:[minxinRouter],
  data(){
    return{
      groups: groups,
      filter:{
        limit:10,
        page:1,
        slug:""
      },
      name:'',
      description:'',
      breadcum:[]
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
  },
  methods:{
    ...mapActions('product',[GET_PRODUCT_BY_SLUG]),
    async init(){
      this.handleUpdateRouteQuery()
      const result = await this[GET_PRODUCT_BY_SLUG](this.filter)
      if(!result.success){
        this.$toast.success(result.message, {
          position: "top-right"
        })
        return
      }
      this.description = result.description.des
      this.name = result.description.name
      this.isFetching = false
    }
  },
  computed:{
    ...mapState('product',{
      products:(state) => state.products,
      count:(state) => state.count,

    })
  },
  watch:{
    filter:{
      handler:function (){
        this.init()
      },deep:true
    }
  }
}
</script>
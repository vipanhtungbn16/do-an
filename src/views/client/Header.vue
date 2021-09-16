<template>
<div class="header"  :class="{'on-scroll':scrollPosition > 10,'hover':hoverItem}">
  <div class="header__logo">
    <router-link to="/">
      <img src="@/assets/img/logo.svg">
    </router-link>
  </div>
  <ul class="header__menu">
    <li @mouseout="hoverItem = false" @mouseover="hoverItem = true" class="header__menu-item" v-for="(item,i) in listDepartment" :key="i">
      <router-link :to="{
        name:'ProductCategory',
        query:{
            limit:10,
          page:1,
          slug:item.slug,
        }
      }"  class="link">
        <span>
            {{item.name}}
        </span>
      </router-link>
      <ul class="header__menu-sub">
          <div class="header__menu-base">
             <div class="header__menu-title">CATEGORY</div>
            <li class="header__menu-sub-item" v-for="(it,j) in item.categorys"  :key="j">
              <router-link  to="" style="text-decoration: none;color: unset" >
                {{it.name}}
              </router-link>
            </li>
          </div>
          <div class="header__menu-childrent">
            <li  v-for="(k,key) in item.categorys"  :key="key">
              <router-link class="child-title"  to="" v-show="k.children.length" style="text-decoration: none;color: unset" >
                {{k.name}}
              </router-link>
                <div class="header__menu-sub-item"  v-for="(sub,subkey) in k.children" :key="subkey">
                  {{sub.name}}
                </div>
            </li>
          </div>
      </ul>
    </li>
  </ul>
  <div class="header__user">
    <div class="header__user-item">
      <img src="@/assets/img/search.svg">
    </div>
    <div class="header__user-item">
      <img src="@/assets/img/user.svg">
    </div>
    <div class="header__user-item">
      <img src="@/assets/img/cart.svg">
    </div>
  </div>
</div>
</template>
<script>
import {FETCH_DEPARTMENT} from "../../store/modules/department";
import {mapActions, mapState} from "vuex";
export default {
  name:'Header',
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
     this.init()

  },

  data(){
    return{
      scrollPosition: null,
      hoverItem:false
    }
  },
  methods:{
    ...mapActions('department',[FETCH_DEPARTMENT]),
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
   async init(){
      let departmentResult = await this[FETCH_DEPARTMENT]()
          if(!departmentResult.success || !departmentResult){
       this.$toast.success(departmentResult.message, {
         position: "top-right",
       })
       return
     }
    },
    handleCate(categorys,parentID = null){
      let categoryList = []
      let category
      if(parentID == null){
        category = categorys.filter(cat=>cat.parentID == undefined)
      }else{
        category = categorys.filter(cat=>cat.parentID == parentID)

      }
      for(let cate of category){
        categoryList.push({
          _id:cate._id,
          name:cate.name,
          slug:cate.slug  ,
          children:this.handleCate(categorys,cate._id)
        })
      }
      return categoryList
    },
  },

  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  },
  computed:{
    ...mapState('department',{
      listDepartment:(state) => state.department
    }),
  }
}
</script>
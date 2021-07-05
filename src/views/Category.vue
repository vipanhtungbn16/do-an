<template>
  <div class="category  pages">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="product__header mb-3">
            <div class="product__header-title title-text">All Category</div>
            <div class="product__header-btn btn ">
              <router-link
                  :to="{name:'add-category'}"
              >
                Add New Category
              </router-link>
            </div>
          </div>
          <br/>
          <div class="product__content">
            <div class="product__content-header">
              <div class="title">All Category</div>
              <div class="action">
                <p-input
                    :placeholder="`Search...`"
                ></p-input>
              </div>
            </div>
            <vcl-table class="loading m-3" v-if="isFetching"></vcl-table>
            <div v-else class="product__content-table">
              <table>
                <thead>
                <tr class="table-header">
                  <th>Name</th>
                  <th style="text-align: right">Options</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in category" :key="i">
                  <td>
                    <span class="fs-12">{{item.name}}</span>
                  </td>
                  <td>
                    <div class="product-action">
                      <div class="btn-soft primary">
                        <i class="far fa-edit"></i>
                      </div>
                      <div class="btn-soft danger">
                        <i class="far fa-trash-alt"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <ppagination
                  :total="count"
                  :perPage.sync="filter.limit"
                  :current.sync="filter.page"
              >
              </ppagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {FETCH_CATEGORY} from "../store/modules/category";
import minxinRouter from "../minxis/route"

export default {
  name: "category",
  components:{},
  mixins:[minxinRouter],
  data(){
    return{
      filter:{
        limit:5,
        page:1,
      },
      isFetching:false
    }
  },
  created() {

    },
  mounted() {
      this.init()
    },
  computed:{
    ...mapState('category',{
      count:state => state.count,
      category:state => state.category
    })
  },
  methods:{
    ...mapActions('category',[FETCH_CATEGORY]),
    init(){
      this.isFetching = true
      this.handleUpdateRouteQuery()
     const result =  this[FETCH_CATEGORY](this.filter)
      if(!result.success){
        this.isFetching = false
      }
      this.isFetching = false
    }
  },
  watch:{
    filter:{
      handler:function (){
        this.init()
      },deep:true
    }
  }
};
</script>


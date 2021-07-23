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
                    v-model="search"
                    @enter="handelSearch"
                    :value="filter.q"
                ></p-input>
              </div>
            </div>
            <vcl-table class="loading m-3" v-if="isFetching"></vcl-table>
            <div v-else class="product__content-table">
              <table>
                <thead>
                <tr class="table-header">
                  <th>#</th>
                  <th>Name</th>
                  <th style="text-align: right">Options</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in category" :key="i">
                  <td width="10">
                    <span class="fs-12">{{item.index + 1}}</span>
                  </td>
                  <td>
                    <span class="fs-12">{{item.name}}</span>
                  </td>
                  <td>
                    <div class="product-action">
                      <div class="btn-soft primary">
                        <router-link :to="{
                          name:'category-detail',
                          params:{
                            id:item._id
                          }
                        }">
                          <i class="far fa-edit"></i>
                        </router-link>
                      </div>
                      <div class="btn-soft danger" @click="handleDeleteModal(item._id)">
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
    <modal-confirm :title="`Delete Confirmation`" :description="`Are you sure delete this ?`" @action="handleDelete"  :visible.sync="isVisibleModal">
    </modal-confirm>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {FETCH_CATEGORY,DELETE_CATEGORY} from "../store/modules/category";
import minxinRouter from "../minxis/route"
import ModalConfirm from "../../uikit/components/Modal/ModalConfirm";

export default {
  name: "category",
  components:{ModalConfirm},
  mixins:[minxinRouter],
  data(){
    return{
      filter:{
        limit:5,
        page:1,
        q:''
      },
      isFetching:false,
      isVisibleModal:false,
      idDelete:'',
      search:''
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
    ...mapActions('category',[FETCH_CATEGORY,DELETE_CATEGORY]),
    init(){
      this.isFetching = true
      this.handleUpdateRouteQuery()
     const result =  this[FETCH_CATEGORY](this.filter)
      if(!result.success){
        this.isFetching = false
      }
      this.isFetching = false
    },
    handleDeleteModal(id){
      this.isVisibleModal=true
      this.idDelete = id
    },
    async handleDelete(){
    await  this[DELETE_CATEGORY](this.idDelete).then(result=>{
      if(result){
        this.$toast.success(result.message, {
          position: "top-right",
        })
      }
    }).catch(err=>{
      this.$toast.error(err.message, {
        position: "top-right",
      })
    })
      this.isVisibleModal = false
      this.init()

    },
    handelSearch(value){
      this.$set(this.filter, 'q', value)
      this.$set(this.filter, 'page', 1)
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


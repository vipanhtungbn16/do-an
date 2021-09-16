<template>
  <div class="product mt-100 pages">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="product__header mb-3">
            <div class="product__header-title title-text">All Products</div>
            <div class="product__header-btn btn ">
              <router-link
              :to="{name:'add-product'}"
              >
                Add New product
              </router-link>
            </div>
          </div>
          <br/>
          <div class="product__content">
            <div class="product__content-header">
              <div class="title">All Product</div>
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
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Stock</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in listProduct" :key="i">
                    <td>
                      <span class=" text-product">{{item.name}}</span>
                    </td>
                    <td>
                      <img v-if="item.image.length" class="img-product" v-lazy="item.image[0]">
                    </td>
                    <td>
                      <span v-if="item.varians.length==0" class="text-product">0</span>
                      <span v-else class="text-product" v-for="(va,i) in item.varians " :key="i" >
                        <span> {{`${va.size} - ${va.quantity}`}}  </span>
                        <br/>

                      </span>

                    </td>
                    <td>
                      <span v-if="item.status" class="text-status badged-success badged">Active</span>
                      <span v-else class="text-status badged-alert badged">Inactive</span>
                    </td>
                    <td>
                      <div class="product-action">
                        <div @click="handleDeleteModalUp" class="btn-soft success" >
                          <i class="far fa-eye"></i>
                        </div>
                        <div class="btn-soft primary">
                          <router-link :to="{name:'product-detail',
                          params:{
                            id:item._id
                          }
                          }"
                                       style="display: inline-flex"
                          >
                            <i class="far fa-edit"></i>
                          </router-link>
                        </div>
                        <div @click="handleDeleteModal(item._id)" class="btn-soft danger">
                          <i class="far fa-trash-alt"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="product__footer">
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
    <modal-confirm :title="`Delete Confirmation`" :description="`Are you sure delete this ?`" @action="handleDelete"  :visible.sync="isVisibleModal">
    </modal-confirm>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {GET_PRODUCT,DELETE_PRODUCT} from "../store/modules/product";
import minxinRouter from "../minxis/route"
import ModalConfirm from "../../uikit/components/Modal/ModalConfirm";
export default {
  name: "product",
  mixins:[minxinRouter],
  components:{ModalConfirm},
  mounted() {
    this.init()
  },
  data(){
    return{
      filter:{
        limit:5, page:1,
        q:''
      },
      search:"",
      isFetching : false,
      isVisibleModal:false,
      idDelete:''
    }

  },
  computed:{
    ...mapState('product',{
      listProduct:(state) =>state.products,
      count:(state) => state.count,
    })
  },
  methods:{
    ...mapActions('product',[GET_PRODUCT,DELETE_PRODUCT]),
    init(){
      this.isFetching = true
      this.handleUpdateRouteQuery()
      const result =  this[GET_PRODUCT](this.filter)
      if(!result.success){
        this.isFetching = false
      }
      this.isFetching = false
    },
    handleDeleteModal(id){
      this.isVisibleModal=true
      this.idDelete = id
    },
    handleDeleteModalUp(){
      this.isVisibleModalUpload=true
    },
    async handleDelete(){
      await  this[DELETE_PRODUCT](this.idDelete).then(result=>{
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


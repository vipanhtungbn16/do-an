<template>
  <div class="pages mt-100 upload__file">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="product__header mb-3">
            <div class="product__header-title title-text">All uploaded files
            </div>
            <div class="product__header-btn btn ">
              Upload New File
            </div>
          </div>
          <br/>
          <div class="product__content">
            <div class="product__content-header">
              <div class="title">All File</div>
              <div class="action">
                <p-input
                    :placeholder="`Search...`"
                    v-model="query"
                ></p-input>
              </div>
            </div>
            <div class="list__product">
              <div v-if="filterFile.length" class="row no-gutters">
                <div class="  col-md-2 mt-4" v-for="(item,i) in  filterFile.slice(pageStart,pageStart + limit)" :key="i">

                  <div class="card-item">
                    <img class="img-item" v-lazy="item.url">
                    <div class="img-name">{{item.name}}</div>
                    <div class="img-size">{{item.size}}KB</div>
                    <a class="close" @click="handleDeleteModal(item.name)">
                      &times;
                    </a>
                  </div>

                </div>
              </div>
              <div v-else class="no-result">
                No files found
              </div>

            </div>
          </div>
          <div class="product__footer">
            <ppagination
                :total="totalPage"
                :perPage.sync="limit"
                :current.sync="page"
            >
            </ppagination>
          </div>
        </div>
      </div>
    </div>
    <modal-confirm :title="`Delete Confirmation`" :description="`Are you sure delete this ?`" @action="delImg"  :visible.sync="isVisibleModal">
    </modal-confirm>
  </div>

</template>

<script>
import {GET_FILE} from "../../store/modules/product";
import {mapActions,mapState} from "vuex";
import AuthService from "../../helper/authService";
import {userService} from "../../service/user.service";
import ModalConfirm from "../../../uikit/components/Modal/ModalConfirm";

export default {
  name:'UploadFile',
  components:{ModalConfirm},
  data(){
    return{
    query:'',
      isVisibleModal:false,
      name:'',
        limit:10,
      page:1,

    }
  },
  mounted() {
  this.init()
    },
  computed:{
  ...mapState('product',{
    files:(state) =>state.files
  }),
    filterFile(){

      return ( this.query.trim() != '' ) ? this.files.filter((item) => {
        return item.name
            .toLowerCase()
            .indexOf(this.query.toLowerCase()) > -1
      }) : this.files;
    },
    totalPage: function(){
      return this.filterFile.length > 0?this.filterFile.length : 1;
    },
    pageStart: function(){
      return (this.page - 1) * this.limit;
    },
  },
  methods:{
    ...mapActions('product',[GET_FILE]),
    async init(){
      const result = await this[GET_FILE]()
      if(!result.success){
        this.$toast.error(result.message, {
          position: "top-right",
        })
      }
    },
    async delImg(){
        let option = {
          method:"POST",
          headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
          },
          body:JSON.stringify({name:this.name})
        }
        await fetch('http://localhost:3000/upload/delete',option).then(userService.handleResponse)
            .then(res=>{
              if(res.success){
                this.$toast.success('Success', {
                  position: "top-right",
                })
                this.init()
                this.isVisibleModal = false
              }

            }).catch(err=>{
              this.$toast.error(err.message, {
                position: "top-right",
              })
            })
    },
    handleDeleteModal(name){
      this.isVisibleModal=true
      this.name = name
    },
  },
}
</script>
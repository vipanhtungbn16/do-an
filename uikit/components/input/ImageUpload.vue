<template>
<div class="multi__upload">
  <div class="multi__upload-content content__item">
    <span class="multi__upload-title content__label fs-12">Images</span>
    <div class="multi__upload-input">
      <label>
        <span class="upload__file-title" @click="handleModal">Choose file</span>
      </label>
    </div>
  </div>
  <div class="multi__upload-preview">
    <div class="fake-title">List</div>
    <ul class="list__preview">
      <li v-for='(value, key) in responseFile' :key="key" class="list__preview-item col-md-3">
        <img v-lazy="value">
        <a class="close" @click="delImg(key)">
          <i class="fas fa-times"></i>
        </a>
      </li>
    </ul>
  </div>
  <modal-upload @add="handleAdd" :visible.sync="isVisible"></modal-upload>
</div>
</template>
<script>
import AuthService from "../../../src/helper/authService";
import axios from "axios";
// import {userService} from "../../../src/service/user.service";
import ModalUpload from "../Modal/ModalUpload";
export default{
  name:'ImageUpload',
  components:{ModalUpload},
  props:{
    oldFile:{
      type:Array,
    },
    detail:Boolean,
  },
  data(){
    return {
      formData:new FormData(),
      imgs: {},
      imgLen:0,
      file:null,
      responseFile:[],
      isVisible:false
    }
  },

  methods: {
    exitEdit(){
      this.$emit('closeEdit', false)
    },
    handleModal(){
      this.isVisible = true
    },
    async delImg(key){
      this.$delete(this.responseFile,key);
      // let input1 = document.getElementById('upload__file')
      // input1.value = ''
      this.imgLen--;
      // if(!this.detail){
      //   let img = value.split('/').pop()
      //   let option = {
      //     method:"POST",
      //     headers:{
      //       "Content-type": "application/json",
      //       "x-access-token": AuthService.getAccessToken(),
      //     },
      //     body:JSON.stringify({name:img})
      //   }
      //   await fetch('http://localhost:3000/upload/delete',option).then(userService.handleResponse)
      //       .then(res=>{
      //         if(res.success){
      //           this.$emit('multiFile',this.responseFile)
      //           this.$toast.success('Success', {
      //             position: "top-right",
      //           })
      //         }
      //
      //       }).catch(err=>{
      //         this.$toast.error(err.message, {
      //           position: "top-right",
      //         })
      //       })
      // }
    },
     async submit(){
      for(let key in this.imgs){
        let name=key.split('?')[0];
        this.formData.append('files',this.imgs[key],name);
      }

       await axios.post('/upload/multi', this.formData,{
        headers: {'Content-Type': 'multipart/form-data',
          "x-access-token": AuthService.getAccessToken(),
        },
      }).then(res => {
         this.$toast.success('Success', {
           position: "top-right",
         })
        this.responseFile = [...this.responseFile,...res.data.file]
         this.$emit('multiFile',this.responseFile)
        this.imgs = {}
         this.formData.delete('files')
      }).catch(err=>{
         this.$toast.error(err.message, {
           position: "top-right",
         })
       });
    },
    handleAdd(file){
      this.responseFile = [...this.responseFile,...file]
      this.$emit('multiFile',this.responseFile)
    }
  },
  watch:{
    oldFile:function (){
      this.responseFile = this.oldFile
    }
  }
}
</script>

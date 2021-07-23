<template>
<div class="multi__upload">
  <div class="multi__upload-content content__item">
    <span class="multi__upload-title content__label fs-12">Images</span>
    <div class="multi__upload-input">
      <label for="upload__file">
        <span class="upload__file-title">Choose file</span>
      </label>
      <input id="upload__file" hidden type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
    </div>
  </div>
  <div class="multi__upload-preview">
    <div class="fake-title">List</div>
    <ul class="list__preview">
      <li v-for='(value, key) in responseFile' :key="key" class="list__preview-item col-md-3">
        <img :src="value">
        <a class="close" @click="delImg(key,value)">
          <box-icon color="#377dff" name='x'></box-icon>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import AuthService from "../../../src/helper/authService";
import axios from "axios";
import {userService} from "../../../src/service/user.service";
export default{
  name:'ImageUpload',
  props:{
    oldFile:{
      type:Array,
    }
  },
  data(){
    return {
      formData:new FormData(),
      imgs: {},
      imgLen:0,
      file:null,
      responseFile:[]
    }
  },

  methods: {
    exitEdit(){
      this.$emit('closeEdit', false)
    },
    addImg(){
      let inputDOM = this.$refs.inputer;
      // Get file data through DOM
      this.file = inputDOM.files;
      let oldLen=this.imgLen;
      let len=this.file.length+oldLen;
      if(len>10){
        alert('Up to 10 sheets can be uploaded');
        return false;
      }
      for (let i=0; i < this.file.length; i++) {
        let size = Math.floor(this.file[i].size / 1024);
        if (size > 5*1024*1024) {
          alert('Please select a picture within 5M! ');
          return false
        }
        this.imgLen++;
        this.$set(this.imgs,this.file[i].name+'?'+new Date().getTime()+i,this.file[i]);
      }
      this.submit()
    },
    getObjectURL(file) {
      let url = null ;
      if (window.createObjectURL!==undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!==undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!==undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    async delImg(key,value){
      this.$delete(this.responseFile,key);
      let input1 = document.getElementById('upload__file')
      input1.value = ''
      this.imgLen--;
      let img = value.split('/').pop()
      let option = {
        method:"POST",
        headers:{
          "Content-type": "application/json",
          "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify({name:img})
      }
      await fetch('http://localhost:3000/upload/delete',option).then(userService.handleResponse)
      .then(res=>{
        if(res.success){
          this.$emit('multiFile',this.responseFile)
          this.$toast.success('Success', {
            position: "top-right",
          })
        }

      }).catch(err=>{
            this.$toast.error(err.message, {
              position: "top-right",
            })
          })


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
  },
  watch:{
    oldFile:function (){
      this.responseFile = this.oldFile
    }
  }
}
</script>

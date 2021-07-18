<template>
  <div class="multi__upload sm">
    <div class="multi__upload-content">
      <div class="multi__upload-input">
        <label :for="['upload__file-single'+id]">
          <span class="upload__file-title">Choose file</span>
        </label>
        <input :id="['upload__file-single'+id]" hidden type="file" class="upload" @change="addImgSingle" :ref="['inputSingle'+id]"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
      </div>
    </div>
    <div v-if="responseFile.length" class="multi__upload-preview">
      <ul class="list__preview">
        <li v-for='(value, key) in responseFile' :key="key" class="list__preview-item ">
          <img :src="value">
          <a class="close" @click="delImg(value,key)">
            <box-icon color="#377dff" name='x'></box-icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AuthService from "../../../src/helper/authService";
import {userService} from "../../../src/service/user.service";

export default{
  name:'SingleUpload',
  props:{
    id:{
      type:[String,Number],
      require:true
    }
  },
  data(){
    return {
      formData:new FormData(),
      imgSingle: {},
      imgSinglength:0,
      fileSingle:[],
      responseFile:[],
      name:''
    }
  },
  methods: {
    exitEdit(){
      this.$emit('closeEdit', false)
    },
     addImgSingle(){
      if(this.responseFile.length > 0){
        this.responseFile.forEach( (elment,index)=>{
          this.$delete(this.responseFile,index);
          let img = elment.split('/').pop()
          let option = {
            method:"POST",
            headers:{
              "Content-type": "application/json",
              "x-access-token": AuthService.getAccessToken(),
            },
            body:JSON.stringify({name:img})
          }
           fetch('http://localhost:3000/upload/delete',option)
        } )
      }
      let inputDOM = this.$refs['inputSingle'+ this.id];
      // Get file data through DOM
      this.fileSingle = inputDOM.files;
      for (let i=0; i < this.fileSingle.length; i++) {
        let size = Math.floor(this.fileSingle[i].size / 1024);
        if (size > 5*1024*1024) {
          alert('Please select a picture within 5M! ');
          return false
        }
        this.imgSingle = {}
        this.$set(this.imgSingle,this.fileSingle[i].name+'?'+new Date().getTime(),this.fileSingle[i]);
      }
    this.submit()
    },
    getObjectURLSingle(file) {
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
   async delImg(value,key){
      let input1 = document.getElementById(`upload__file-single${this.id}`)
      input1.value = ''
      this.$delete(this.responseFile,key);
     this.$emit('file',"",this.id)
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
      for(let key in this.imgSingle){
        let name=key.split('?')[0];
        this.formData.append('files',this.imgSingle[key],name);
      }

      await axios.post('/upload/multi', this.formData,{
        headers: {'Content-Type': 'multipart/form-data',
          "x-access-token": AuthService.getAccessToken(),
        },
      }).then(res => {
        this.$toast.success('Success', {
          position: "top-right",
        })
        this.responseFile = res.data.file
        this.$emit('file',this.responseFile[0],this.id)
        this.imgSingle = {}
        this.formData.delete('files')
      }).catch(err=>{
        this.$toast.error(err.message, {
          position: "top-right",
        })
      });
    },
  }
}
</script>

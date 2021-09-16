<template>
  <div class="multi__upload sm">
    <div class="multi__upload-content">
      <div class="multi__upload-input">
        <label :for="['upload__file-single'+id]">
          <span class="upload__file-title"  @click="handleModal" >Choose file</span>
        </label>
      </div>
    </div>
    <div v-if="responseFile.length" class="multi__upload-preview">
      <ul class="list__preview">
        <li v-for='(value, key) in responseFile' :key="key" class="list__preview-item ">
          <img v-lazy="value">
          <a style="text-decoration: none" class="close" @click="delImg(value,key)">
            <i class="fas fa-times"></i>
          </a>
        </li>
      </ul>
    </div>
    <modal-upload @add="handleAdd" :single="true" :visible.sync="isVisible"></modal-upload>
  </div>
</template>
<script>
// import axios from "axios";
// import AuthService from "../../../src/helper/authService";
import ModalUpload from "../Modal/ModalUpload";

export default{
  name:'SingleUpload',
  components:{ModalUpload},
  props:{
    id:{
      type:[String,Number],
      require:true
    },
    oldFile:{
     type: String,
    },
    detail:Boolean,
  },
  data(){
    return {
      formData:new FormData(),
      imgSingle: {},
      imgSinglength:0,
      fileSingle:[],
      responseFile:[],
      name:'',
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
    delImg(value,key){
      this.$delete(this.responseFile,key);
     this.$emit('file',"",this.id)

    },
    handleAdd(file){
      this.responseFile = file
      this.$emit('file',this.responseFile[0],this.id)
    },

  },
  watch:{
    oldFile:{
      handler (){
        if(this.oldFile){
          this.responseFile = [this.oldFile]
        }
      },
      immediate:true
    },


  }
}
</script>

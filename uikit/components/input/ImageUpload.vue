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
      <li v-for='(value, key) in imgs' :key="key" class="list__preview-item col-md-3">
        <img :src="getObjectURL(value)">
        <a class="close" @click="delImg(key)">
          <box-icon color="#377dff" name='x'></box-icon>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default{
  name:'ImageUpload',
  data(){
    return {
      formData:new FormData(),
      imgs: {},
      imgLen:0,
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
      if(len>3){
        alert('Up to 20 sheets can be uploaded');
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
    delImg(key){
      this.$delete(this.imgs,key);
      this.imgLen--;
    },
    // submit(){
    //   for(let key in this.imgs){
    //     let name=key.split('?')[0];
    //     this.formData.append('multipartFiles',this.imgs[key],name);
    //   }
    //   this.$http.post('/opinion/feedback', this.formData,{
    //     headers: {'Content-Type': 'multipart/form-data'}
    //   }).then(res => {
    //     this.alertShow=true;
    //   });
    // },
  }
}
</script>

<template>
    <div v-if="isActive" class="p__modal upload">
      <transition :name="animation" appear>
        <div v-if="isActive" class="p__modal-background" @click="cancel"></div>
      </transition>
      <transition :name="`dropdown`" appear>
        <div v-if="isActive" class="content-container modal-lg">
          <div class="p__modal-header">
            <slot name="header">
              <div class="p__modal-tab d-flex">
                <div class="btn-tab" :class="{ active: Active('file') }" @click="setActive('file')">Select File</div>
                <div class="btn-tab" :class="{ active: Active('upload') }"  @click="setActive('upload')">Upload New</div>
              </div>
              <span @click="cancel">
                <i class="fas fa-times icon"></i>
              </span>
            </slot>
          </div>
          <div class="p__modal-content">
            <div v-if="Active('file')" class="p__modal-search">
              <p-input
                  v-model="query"
                  :placeholder="`Search...`"
              ></p-input>
            </div>
            <div v-if="Active('file')" class="p__modal-list">
              <div v-if="filterFile.length" class="row no-gutters">
                <div class="  col-md-2 mt-4" v-for="(item,i) in  filterFile" :key="i">
                  <div class="card-item" :class="{selected:activeImg(item)}" @click="onSelect(item)">
                    <img class="img-item" v-lazy="item.url">
                    <div class="img-name">{{item.name}}</div>
                  </div>

                </div>
              </div>
              <div class="no-result" v-else>
                No files found
              </div>
            </div>
            <div v-if="Active('upload')" class="p__modal-drop">
              <div class="p__modal-drop-content" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                <div class="p__modal-drop-dash">
                  <input ref="file" @change="addImg" class="p__modal-drop-input" multiple accept="image/png,image/jpeg,image/gif,image/jpg" id="upload__file" hidden type="file">
                  <label for="upload__file"  class="p__modal-drop-label">
                    <div class="p__modal-drop-text">Drop files here, paste or Browse</div>
                  </label>
                </div>
                <div class="p__modal-drop-img">
                  <div class="row no-gutters">
                    <div class="  col-md-2 mt-4" v-for="(item,i) in  selectedItem" :key="i">
                      <div class="card-item">
                        <img class="img-item" v-lazy="item">
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p__modal-footer">
            <div class="group-button">
              <div class="clear-file">
                <div  class="number-file">{{selectedItem.length}} File selected</div>
                <div  class="clear-file-btn" @click="clear">Clear</div>
              </div>
              <button class="btn" @click="action" :class="classType">{{confirm}}</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {GET_FILE} from "../../../src/store/modules/product";
import axios from "axios";
import AuthService from "../../../src/helper/authService";
export default {
  name:'ModalUpload',
  props:{
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    confirm: {
      type: String,
      default: 'Add file',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: 'Are you sure ?',
    },
    animation: {
      type: String,
      default: 'fade',
    },
    type:{
      type:String,
      default: 'primary',
    },
    single:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      isActive: this.visible || false,
      activeItem:'file',
      selectedItem:[],
      file:null,
      formData:new FormData(),
      imgs: {},
      query:''
    }
  },
  mounted() {
  this.init()
    },
  methods:{
    ...mapActions('product',[GET_FILE]),
    cancel() {
      this.isActive = false
      this.selectedItem = []
      this.$emit('update:visible', false)
    },
   async init(){
      const result = await this[GET_FILE](this.filter)
      if(!result.success){
          this.$toast.error(result.message, {
            position: "top-right",
          })
      }
    },
    action(){
      this.$emit('add', this.selectedItem)
      this.$emit('update:visible', false)
      this.selectedItem = []
    },
    Active (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      if(menuItem == 'file'){
        this.init()
      }
      this.activeItem = menuItem
    },
    onSelect(item){
     let index = this.selectedItem.indexOf(item.url)
     if(index > -1){
       this.selectedItem.splice(index,1)
       return
     }
     if(this.single){
       this.selectedItem = []
       this.selectedItem.push(item.url)
       return;
     }
     this.selectedItem.push(item.url)
    },
    activeImg(item){
      let index = this.selectedItem.indexOf(item.url)
      return (index >= 0)
    },
    clear(){
      this.selectedItem = []
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('on-drag')) {
        event.currentTarget.classList.add('on-drag');
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.remove('on-drag');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.addImg()
      // Clean up
      event.currentTarget.classList.remove('on-drag');
    },
    addImg(){
       this.file = this.$refs.file.files;
      // Get file data through DOM
      let len=this.file.length;
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
        this.$set(this.imgs,this.file[i].name+'?'+new Date().getTime()+i,this.file[i]);
      }
       this.submit()
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
        this.selectedItem = [...this.selectedItem,...res.data.file]
        this.$emit('multiFile',this.selectedItem)
        this.imgs = {}
        this.formData.delete('files')
      }).catch(err=>{
        this.$toast.error(err.message, {
          position: "top-right",
        })
      });
    },
  },
  computed:{
    classType(){
      return this.type ? 'btn--' + this.type : ''
    },
    filterFile(){
      let tempFile = this.files
      if (!this.files) return []
      if(this.query !=''){
        tempFile = tempFile.filter((item) => {
          return item.name
              .toUpperCase()
              .includes(this.query.toUpperCase())
        })
      }
      return tempFile
    },
    ...mapState('product',{
      files:state => state.files,
    })
  },
  watch: {
    visible(value) {
      this.isActive = value
    },
  },
}
</script>
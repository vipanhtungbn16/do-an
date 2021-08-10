<template>
  <transition :name="animation">
    <div v-if="isActive" class="p__modal upload">
      <div class="p__modal-background" @click="cancel"></div>
      <div class="content-container modal-lg">
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
                :placeholder="`Search...`"
            ></p-input>
          </div>
          <div v-if="Active('file')" class="p__modal-list">
            <div class="row no-gutters">
              <div class="  col-md-2 mt-4" v-for="(item,i) in  files" :key="i">
                <div class="card-item" :class="{selected:activeImg(item)}" @click="onSelect(item)">
                  <img class="img-item" :src="item.url">
                  <div class="img-name">{{item.name}}</div>
                </div>

              </div>
            </div>
          </div>
          <div class="p__modal-drop">

          </div>
        </div>
        <div class="p__modal-footer">
          <div class="group-button">
            <div class="clear-file">
              <div class="number-file">{{selectedItem.length}} File selected</div>
              <div class="clear-file-btn" @click="clear">Clear</div>
            </div>
            <button class="btn" @click="action" :class="classType">{{confirm}}</button>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import {GET_FILE} from "../../../src/store/modules/product";
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
  },
  data() {
    return {
      isActive: this.visible || false,
      activeItem:'file',
      selectedItem:[]
    }
  },
  mounted() {
  this.init()
    },
  methods:{
    ...mapActions('product',[GET_FILE]),
    cancel() {
      this.isActive = false
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
      this.$emit('action', true)
    },
    Active (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    onSelect(item){
     let index = this.selectedItem.indexOf(item.url)
     if(index > -1){
       this.selectedItem.splice(index,1)
       return
     }
     this.selectedItem.push(item.url)
    },
    activeImg(item){
      let index = this.selectedItem.indexOf(item.url)
      return (index >= 0)
    },
    clear(){
      this.selectedItem = []
    }
  },
  computed:{
    classType(){
      return this.type ? 'btn--' + this.type : ''
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
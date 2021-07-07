<template>
  <transition :name="animation">
    <div v-if="isActive" class="p__modal">
      <div class="p__modal-background" @click="cancel"></div>
      <div class="content-container modal-sm">
        <div class="p__modal-header">
          <slot name="header">
          <span class="p__modal-header-text">
            {{title}}
          </span>
            <span @click="cancel">
              <i class="fas fa-times icon"></i>
            </span>
          </slot>
        </div>
        <div class="p__modal-content">
          <slot class="content">
            <span v-html="description"></span>
          </slot>
        </div>
        <div class="p__modal-footer">
          <div class="group-button">
            <button class="btn" @click="cancel">{{cancelText}}</button>
            <button class="btn" @click="action" :class="classType">{{confirm}}</button>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
export default {
  name:'ModalConfirm',
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
      default: 'Confirm',
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
    }
  },
  methods:{
    cancel() {
      this.isActive = false
      this.$emit('update:visible', false)
    },
    action(){
      this.$emit('action', true)

    }
  },
  computed:{
    classType(){
      return this.type ? 'btn--' + this.type : ''
    }
  },
  watch: {
    visible(value) {
      this.isActive = value
    },
  },
}
</script>
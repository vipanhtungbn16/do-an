<template>
  <div class="p-checkbox">
    <input hidden class="ios8-switch" :id="['checkbox' + name]"  type="checkbox"  v-model="checked" @change="onChange" />
    <label :for="['checkbox' + name]"></label>
  </div>

</template>

<script>
export default {
  name: 'PCheckbox',
  props: {
    name:String,
    value:{
     type: Boolean,
      default:false
    }
  },
  data(){
    return{
    checked:false
    }
  },
  created() {
  this.checked = this.value
    },
  methods: {
    onChange() { // Supports .lazy
      // Can add validation here
      this.$emit('change',this.checked);
    },
  },
  watch:{
    'value':function (){
      this.checked = this.value
    }
  }
}
</script>
<template>
  <div class="p-checkbox">
    <input hidden class="ios8-switch" id="checkbox"  type="checkbox"   @input="onInput" @change="onChange" />
    <label for='checkbox'></label>
  </div>

</template>

<script>
export default {
  name: 'PCheckbox',
  props: {
    placeholder:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'text'
    }
  },
  /* Can add validation here
  watch: {
    value: {
      handler(newValue, oldValue) {

      },
    },
  }, */
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit('input', event.target.value);
    },
    onChange(event) { // Supports .lazy
      // Can add validation here
      this.$emit('change', event.target.value);
    },
  },
}
</script>
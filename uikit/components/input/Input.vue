<template>
    <input class="p-input" :value="value"  v-bind="$attrs" @keyup.enter="onEnter" :placeholder="placeholder" :type="type"  @input="onInput" @change="onChange" />
</template>

<script>
export default {
  name: 'PInput',
  props: {
    placeholder:{
      type:String,
      default:''
    },
    value: {
      type: [String, Number],
    },
    type:{
      type:String,
      default:'text'
    },

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
    onEnter(event) {
      // Can add validation here
      this.$emit('enter', event.target.value);
    },
    onChange(event) { // Supports .lazy
      // Can add validation here
      this.$emit('change', event.target.value);
    },
  },
}
</script>
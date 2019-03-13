<template>
  <b-row class="mb-4">
    <b-col cols="2" class="mt-1">
      <label :for="labelFor">{{ label }}:&nbsp;</label>
    </b-col>
    <b-col>
      <input
        required
        class="form-control"
        :type="type"
        v-model="credentials"
        autocomplete="new-password"
        @keyup="onKeyUp"
      >
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    type: { default: 'text' },
    labelFor: {},
    label: {}
  },
  methods: {
    onKeyUp() {
      console.log('bitch')
      // this.$emit('keyUp', true)
    }
  }
}
</script>
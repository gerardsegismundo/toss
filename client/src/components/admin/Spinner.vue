<template>
  <div class="main-wrapper m-auto d-flex justify-content-center">
    <div style class="m-auto">
      <h3 class="m-auto text-secondary">{{message}}</h3>
      <Hexagon class="m-auto spinner"></Hexagon>
    </div>
  </div>
</template>

<script>
import { Hexagon } from 'vue-loading-spinner'

export default {
  name: 'Spinner',
  props: ['message'],
  components: {
    Hexagon
  }
}
</script>

<style scoped>
.main-wrapper {
  position: absolute;
  left: 0;
  right: 0;
}

h3 {
  margin-bottom: 2rem !important;
}
</style>
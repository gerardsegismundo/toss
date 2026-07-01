<template>
  <div
    class="main-wrapper m-auto d-flex justify-content-center d-flex align-content-center"
  >
    <div style class="m-auto">
      <h3 class="m-auto text-secondary">{{message}}</h3>
      <b-spinner class="m-auto spinner" variant="primary" label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: ['message'],
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
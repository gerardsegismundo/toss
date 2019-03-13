<template>
  <nav class="bg-dark">
    <ul>
      <li @click="isOnClick = !isOnClick">
        <b-row>
          <b-col cols="1">
            <i class="fas fa-globe text-primary"></i>
          </b-col>
          <b-col>IBM Cloud</b-col>
          <b-col cols="1">
            <i class="fas text-primary fa-angle-right" :class="[isOnClick ? 'is-up': 'is-down']"></i>
          </b-col>
        </b-row>
      </li>
      <div v-if="isOnClick">
        <router-link :to="{name: 'Assistant'}">
          <li class="text-center">Watson Assistant v1</li>
        </router-link>
        <router-link :to="{name: 'Discovery'}">
          <li class="text-center">Discovery-8r</li>
        </router-link>
      </div>
      <router-link :to="{name: 'Response'}">
        <li>
          <i class="fas fa-comment-alt text-primary mr-2"></i>
          Response
        </li>
      </router-link>
      <router-link :to="{name: 'Excels'}">
        <li>
          <i class="fas fa-file-excel text-primary mr-2"></i>
          Excel
        </li>
      </router-link>
      <router-link :to="{name: 'Filtered'}">
        <li>
          <i class="fas fa-filter text-primary mr-2"></i>
          Filtered
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOnClick: false
    }
  }
}
</script>

<style scoped>
nav {
  cursor: pointer;
  background-color: rgb(51, 51, 51);
  box-shadow: 0 8px 14.72px 1.28px rgba(101, 169, 119, 0.3);
}

nav li {
  color: #ffffff;
  padding: 1.3rem 2rem;
  width: 100%;
}

nav li:hover {
  background-color: #222;
}

nav li:hover i {
  color: #fff !important;
}

nav .router-link-exact-active li i {
  color: #fff !important;
}

nav .router-link-exact-active li {
  background-color: rgb(23, 23, 23);
}

.is-up {
  transform: rotate(270deg);
  transition: all 0.3s;
}

.is-down {
  transform: rotate(90deg);
  transition: all 0.3s;
}
</style>

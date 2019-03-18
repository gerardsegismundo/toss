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
      <!-- 
        ** FIX animation
        * planning to use velocity.js
      -->
      <div class="ibm-list" :class="isOnClick? 'slide-down':'slide-up'">
        <router-link :to="{name: 'Assistant'}" v-if="isOnClick">
          <li class="text-center">Watson Assistant v1</li>
        </router-link>
        <router-link :to="{name: 'Discovery'}" v-if="isOnClick">
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
import velocity from 'velocity-animate'

export default {
  data() {
    return {
      isOnClick: false
    }
  },
  methods: {
    slideDown() {
      // this.$ref..velocity("slideDown", { duration: 1500 })
    },
    slideUp() {
      // .velocity("slideUp", { delay: 500, duration: 1500 });
    }
  }
}
</script>

<style scoped>
.ibm-list {
  animation-duration: 0.5s;
  transition: ease-in;
}

.ibm-list.slide-down {
  animation-name: slideDown;
}
.ibm-list.slide-up {
  animation-name: slideUp;
}

.ibm-list li {
  animation-name: fade;
  animation-duration: 0.5s;
  transition: 0.25s ease-in-out;
}

@keyframes slideDown {
  0% {
    height: 0rem;
    transition: 0.5s;
  }
  100% {
    height: 8rem;
    transition: 0.5s;
  }
}

@keyframes slideUp {
  0% {
    /* transition: 0.5s;
    height: 8rem; */
  }
  100% {
    transition: 0.5s;
    height: 0rem;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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

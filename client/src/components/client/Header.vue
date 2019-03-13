<template>
  <div v-show="!isAdmin">
    <app-navbar/>
    <app-carousel/>
    <app-chat-input/>
  </div>
</template>
<script>
import Carousel from './Carousel.vue';
import Navbar from './Navbar.vue';
import ChatInput from './ChatInput.vue';

export default {
  name: 'headerComponent',
  data() {
    return {
      isAdmin: false
    };
  },
  watch: {
    $route() {
      if (
        window.location.href.includes('admin-dashboard') ||
        window.location.href.includes('auth')
      )
        this.isAdmin = true;
      else this.isAdmin = false;
    }
  },
  beforeMount() {
    this.confirmAdmin();
  },
  methods: {
    confirmAdmin() {
      if (
        window.location.href.includes('admin-dashboard') ||
        window.location.href.includes('auth')
      )
        this.isAdmin = true;
      else this.isAdmin = false;
    }
  },
  components: {
    appNavbar: Navbar,
    appCarousel: Carousel,
    appChatInput: ChatInput
  }
};
</script>

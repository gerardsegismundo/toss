<template>
  <div class="py-3 d-flex justify-content-center">
    <app-chat-box/>
  </div>
</template>

<script>
import ChatBox from '@/components/client/ChatBox';

export default {
  name: 'HomePage',
  data() {
    return {
      msg: 'Welcome to Homepage'
    };
  },
  components: {
    appChatBox: ChatBox
  }
};
</script>


<style scoped>
</style>

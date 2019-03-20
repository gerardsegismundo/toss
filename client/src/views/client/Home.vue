<template>
  <div class="chat-wrapper">
    <app-chat-input/>
    <app-chat-box/>
  </div>
</template>

<script>
import ChatBox from '@/components/client/ChatBox'
import ChatInput from '@/components/client/ChatInput.vue'

export default {
  name: 'HomePage',
  data() {
    return {
      msg: 'Welcome to Homepage'
    }
  },
  components: {
    appChatBox: ChatBox,
    appChatInput: ChatInput
  }
}
</script>


<style scoped>
.chat-wrapper {
  /* margin-top: -18vh; */
  z-index: 999;
}
</style>

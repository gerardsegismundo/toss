<template>
  <div
    class="msg-box mb-5"
    :class="[isActive? 'is-active-true': 'is-active-false']"
    @click="isClicked(true)"
    v-click-outside="onClickOutside"
  >
    <b-row class="py-1 msg-head bg-light d-flex justify-content-center align-items-center">
      <b-col class="d-flex align-items-center">
        <i class="ml-2 mr-1 fa fa-circle" :class="[isActive? 'text-success': '']"></i>
        <span class="my-2 ml-2">Toss</span>
        <i
          class="clear-message fa fa-redo-alt text-success"
          @click="clearMessages"
          :class="[isActive? 'displayInherit':  'displayNone']"
        ></i>
      </b-col>
    </b-row>
    <div class="chat-container px-5 pt-3" ref="chatContainer">
      <div
        v-for="(message, i) in allMessages"
        :key="i"
        :class="[isActive? 'displayInherit': 'displayNone']"
      >
        <b-row
          class="d-flex"
          :class="[message.sender == 'user' ? 'justify-content-end' : 'justify-content-start']"
        >
          <img v-if="message.content == 'loading'" :src="loader">

          <p
            v-else
            :class="[message.sender == 'user' ? 'bot-response' : 'user-request']"
          >{{ message.content }}</p>
        </b-row>
      </div>
    </div>
    <div class="msg-footer"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChatBoxComponent',
  data() {
    return {
      loader: require('@/assets/images/loader.gif')
    }
  },
  computed: mapGetters(['allMessages', 'isActive']),

  methods: {
    scrollToEnd() {
      const chatContainer = this.$refs.chatContainer
      const scrollHeight = chatContainer.scrollHeight
      chatContainer.scrollTop = scrollHeight
    },

    onClickOutside(event, el) {
      if (event.path[1].classList.contains('cbox-group'))
        return this.isClicked(true)

      this.isClicked(false)
    },

    ...mapActions(['clearMessages', 'isClicked'])
  },

  mounted() {
    this.scrollToEnd()
  },

  updated() {
    this.scrollToEnd()
  }
}
</script>


<style scoped>
.is-active-true {
  opacity: 1;
  transition: all 0.5s;
  width: 48vw;
  box-shadow: 0px 7px 17px 0px rgba(69, 69, 69, 0.5);
}

.is-active-false {
  opacity: 0.5;
  transition: all 0.5s;
  width: 46vw;
}

.fa-circle {
  cursor: context-menu;
  font-size: 0.6rem;
  opacity: 0.5;
}

.fa-circle.text-success {
  opacity: 0.8;
}

.msg-box {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  left: 6vw;
  margin: 0 20vw;
}

.msg-head {
  background-image: linear-gradient(
    rgba(46, 46, 46, 0.06),
    rgba(34, 34, 34, 0)
  ) !important;
  margin: 0 0;
  border-radius: 0.25rem 0.25rem 0 0;
}

.msg-head div {
  box-shadow: 0px 1px 1px rgba(34, 34, 34, 0.1);
}

.msg-head span {
  font-weight: 430;
  letter-spacing: 0.05rem;
}

.clear-message {
  position: absolute;
  right: 5%;
}

.is-active-false .chat-container {
  cursor: pointer;
}

.chat-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 58vh;
  background: #fff;

  scroll-behavior: smooth;
}
.chat-container p {
  max-width: 60%;
}

.chat-container::-webkit-scrollbar {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}
.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(34, 34, 34, 0.05);
  outline: 1px solid slategrey;
}

.bot-response,
.user-request {
  padding: 0.857rem 1.6rem;
  width: auto;
  overflow-wrap: break-word;
}

.bot-response {
  background: var(--vuestic-green);
  border-radius: 0.4rem 0rem 0.4rem 0.4rem;
  display: inline-block;
}

.user-request {
  background-color: #eff4f5;
  border-radius: 0rem 0.4rem 0.4rem 0.4rem;
  display: block;
}

.displayNone {
  display: none;
  transition: all 0.5;
}

.displayInherit {
  display: inherit;
  transition: all 0.5;
}
</style>




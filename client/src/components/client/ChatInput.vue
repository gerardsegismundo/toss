<template>
  <div class="bg-light pt-3 pb-2">
    <b-container fluid>
      <b-input-group
        class="cbox-group"
        prepend
        @click.once="greetUser"
        @keyup.esc="hidePhrases"
        :class="[isActive? 'is-active':'not-active']"
      >
        <input class="form-control" @keyup.enter="sendRequest(userRequest)" v-model="userRequest">
        <b-input-group-append class="cbox-group">
          <b-btn @click="sendRequest(userRequest)" variant="success" class="cbox-group">
            <i class="fa fa-play cbox-group"></i>
          </b-btn>
        </b-input-group-append>
        <div v-show="displayPhrasing" class="display-phrasing">
          <div v-for="phrasing in phrasings" :key="phrasing.id" class="phrasings cbox-group">
            <div
              :id="phrasing.id"
              @click="sendSuggestion(phrasing.phrasing, phrasing.id)"
            >{{ phrasing.phrasing }}</div>
          </div>
        </div>
      </b-input-group>
    </b-container>
  </div>
</template>

<script>
import { API } from '@/../config/server.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'inputComponent',
  data: () => ({
    phrasings: [],
    userRequest: '',
    botResponse: '',
    hidePhrasing: false
  }),

  computed: {
    ...mapGetters(['allMessages', 'isLoading', 'isActive']),

    displayPhrasing() {
      if (this.userRequest.length >= 2 && this.hidePhrasing == false)
        return true
      return false
    }
  },

  watch: {
    async userRequest(value) {
      if (this.isLoading == true) return (this.hidePhrasing = true)

      this.hidePhrasing = false

      const response = await this.axios.post(
        `${API}/response/search-phrasing`,
        {
          phrasing: value
        }
      )

      this.phrasings = response.data
    }
  },

  methods: {
    /*  scrollUp(e) {
      const inputContainer = this.$refs.inputContainer

      window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    }, */
    async sendRequest(req) {
      if (this.isLoading == true) return

      this.userRequest = ''

      this.storeMessage({
        sender: 'user',
        content: req
      })

      this.setLoading(true)
      this.storeMessage({
        sender: 'bot',
        content: 'loading'
      })

      const request = req.toLowerCase()
      const response = await this.axios.get(
        `${API}/response/request/${request}`
      )

      this.botResponse = response.data

      this.botRespond(req)

      this.setLoading(false)
    },

    async sendSuggestion(req, id) {
      this.sendRequest(req)
      this.hidePhrases()
    },

    async botRespond(request) {
      this.removeLoader()
      this.storeMessage({
        sender: 'bot',
        content: this.botResponse
      })
    },

    hidePhrases() {
      this.hidePhrasing = true
    },

    ...mapActions(['storeMessage', 'greetUser', 'removeLoader', 'setLoading'])
  }
}
</script>

<style scoped>
.input-group {
  margin: auto;
  transition: all 0.5s;
}

.input-group.not-active {
  width: 46vw;
}

.input-group.is-active {
  width: 58vw;
}

.form-control:focus {
  border-color: #ced4da;
  transition: all 0.5s;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
  border-right: 1px solid #ffffff;
}

.phrasings {
  transition: all 0.5s;
  padding: 0.6rem;
  border: 0px 1px 1px 1px solid #d3d3d3;
  cursor: pointer;
  background-color: #ffffff;
}

.phrasings:hover {
  background-color: #f6f6f6;
}

span {
  z-index: 2;
}

.display-phrasing {
  border: 1px solid #ced4da;
  position: absolute;
  width: 100%;
  top: 100%;
  z-index: 99;
}

.display-phrasing {
  border-top: none;
  box-shadow: var(--vuestic-box-shadow);
}
</style>

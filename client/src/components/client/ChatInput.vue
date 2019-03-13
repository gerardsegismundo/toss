<template>
  <div class="bg-light pt-3 pb-2">
    <b-container fluid>
      <b-row>
        <b-col cols="2" lg="3"></b-col>
        <b-col>
          <b-input-group
            class="cbox-group"
            prepend
            @click.once="greetUser"
            @keyup.esc="hidePhrases"
          >
            <input
              class="form-control"
              @keyup.enter="sendRequest(userRequest)"
              v-model="userRequest"
            >
            <b-input-group-append>
              <b-btn @click="sendRequest" variant="success" class="cbox-group">
                <i class="fa fa-play"></i>
              </b-btn>
            </b-input-group-append>
          </b-input-group>
          <div v-show="displayPhrasing" class="display-phrasing">
            <div v-for="phrasing in phrasings" :key="phrasing.id" class="phrasings cbox-group">
              <div
                :id="phrasing.id"
                @click="sendSuggestion(phrasing.phrasing, phrasing.id)"
              >{{ phrasing.phrasing }}</div>
            </div>
          </div>
        </b-col>
        <b-col cols="2" lg="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API } from '@/../config/server.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'inputComponent',
  data() {
    return {
      phrasings: [],
      userRequest: '',
      botResponse: '',
      hidePhrasing: false
    }
  },

  computed: {
    ...mapGetters(['allMessages', 'isLoading']),

    displayPhrasing() {
      if (this.userRequest.length >= 2 && this.hidePhrasing == false) {
        return true
      }
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
.form-control:focus {
  border-color: #ced4da;
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
}

.display-phrasing {
  border-top: none;
  box-shadow: var(--vuestic-box-shadow);
}
</style>

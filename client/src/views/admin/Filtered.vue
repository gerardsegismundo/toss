<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <h3>Filtered</h3>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <button class="btn btn-danger" @click="deleteAll()">
          &nbsp;delete all&nbsp;&nbsp;
          <i class="fa fa-trash-alt"></i>
        </button>
      </b-col>
    </b-row>
    <b-card v-for="(response, i) in filteredResponses" :key="response._id" class="mb-3">
      <b-row>
        <b-col>
          <p>
            <span class="label">date:</span>
            &nbsp;
            {{ dates[i] }}
          </p>
          <p>
            <span class="label">phrasing:</span>
            &nbsp;
            {{ response.phrasing }}
          </p>
          <p v-if="response.nouns.proper.length">
            <span class="label">proper nouns:</span>
            &nbsp;
            <span
              v-for="(noun, i) in response.nouns.proper"
              :key="i"
            >{{ noun }}&nbsp;</span>
          </p>
          <p v-if="response.nouns.common.length">
            <span class="label">common nouns:</span>
            &nbsp;
            <span
              v-for="(noun, i) in response.nouns.common"
              :key="i"
            >{{ noun }}&nbsp;</span>
          </p>

          <p v-if="response.verbs.length">
            <span class="label">verbs:</span>
            &nbsp;
            <span v-for="(verb, i) in response.verbs" :key="i">{{ verb }}&nbsp;</span>
          </p>
          <p>
            <span class="label">entities:</span>
            &nbsp;
            <span
              v-for="(entity, i) in response.entities"
              :key="i"
            >{{ entity }}&nbsp;</span>
          </p>
        </b-col>

        <b-col cols="1" class="d-flex flex-row-reverse">
          <i class="fa fa-trash-alt i-btn" @click="deleteItem(response._id)"></i>
          <i class="fa fa-pencil-alt mr-2 i-btn"></i>
        </b-col>
      </b-row>
    </b-card>

    <b-modal size="sm" ref="deleteModal" hide-footer>
      <h5 class="d-block text-center">Are you sure you want to delete?</h5>
      <b-btn class="mt-3" variant="danger" block @click="deleteConfirmed">Yes</b-btn>
    </b-modal>

    <b-modal size="sm" ref="deleteAllModal" hide-footer>
      <h5 class="d-block text-center">Are you sure you want to delete all?</h5>
      <b-btn class="mt-3" variant="danger" block @click="deleteAllConfirmed">Yes</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { API } from '@/../config/server.js'

export default {
  name: 'Filtered',
  data() {
    return {
      deleteId: '',
      filteredResponses: [],
      dates: []
    }
  },
  methods: {
    deleteItem(id) {
      this.deleteId = id
      this.$refs.deleteModal.show()
    },

    deleteAll() {
      this.$refs.deleteAllModal.show()
    },

    formatDate(date) {
      let formatDate = new Date(date)
      return formatDate
        .toDateString()
        .split(' ')
        .splice(1)
        .join(' ')
    },

    async getFilteredItems() {
      const response = await this.axios.get(`${API}/filtered/`)
      this.filteredResponses = response.data

      this.filteredResponses.map(dates => {
        let date = this.formatDate(dates.date)
        this.dates.push(date)
      })
    },

    async deleteConfirmed() {
      await this.axios.delete(`${API}/filtered/${this.deleteId}`)

      this.getFilteredItems()
      this.$refs.deleteModal.hide()
      this.deleteId = ''
    },

    async deleteAllConfirmed() {
      await this.axios.delete(`${API}/filtered/`)

      this.$refs.deleteAllModal.hide()
      this.getFilteredItems()
    }
  },

  beforeMount() {
    this.getFilteredItems()
  }
}
</script>

<style scoped>
</style>

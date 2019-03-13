<template>
  <div>
    <h3 class="mb-4">Excel file converter</h3>
    <form action="post">
      <b-form-file
        ref="inputFile"
        v-model="file"
        :state="Boolean(file)"
        accept=".xlsx, .xls"
        no-drop
        placeholder="Choose a file..."
        @change="handleConvertFile"
      ></b-form-file>
      <div class="mt-3">Selected file: {{ file && file.name }}</div>
      <div class="mt-2 d-flex justify-content-end">
        <button class="btn btn-pale" @click.prevent="clearFiles">
          clear
          <i class="fa fa-times-circle ml-2"></i>
        </button>
        <button class="btn btn-primary ml-3" @click.prevent="convertFile">
          convert
          <i class="fa fa-check-circle ml-2"></i>
        </button>
      </div>
    </form>
    <hr class="my-4">
    <h3 class="my-4 text-dark">JSON data</h3>

    <div v-show="jsonFile.length">
      <b-card>
        <b-row>
          <b-col cols="11">
            <p v-for="(content, i) in jsonFile" :key="i">{{i}}&nbsp;&nbsp;&nbsp;{{ content }}</p>
          </b-col>
          <b-col cols="1">
            <i class="fa fa-file-import i-btn mr-2" @click="importSettings"></i>
            <i class="fa fa-trash-alt i-btn" @click="deleteExcel"></i>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <!-- MODALS -->
    <b-modal size="sm" ref="deleteModal" hide-footer @keydown.native.enter="deleteConfirmed">
      <div class="d-block text-center">
        <h5>Are you sure you want to delete?</h5>
      </div>
      <b-btn class="mt-3" variant="danger" block @click="deleteConfirmed">Yes</b-btn>
    </b-modal>
  </div>
</template>
<script>
import { API } from '@/../config/server.js'

export default {
  data() {
    return {
      file: '',

      files: [],
      jsonFile: {}
    }
  },
  methods: {
    clearFiles() {
      this.$refs.inputFile.reset()
    },
    async convertFile() {
      let formData = new FormData()

      formData.append('file', this.file)

      const response = await this.axios.post(
        `${API}/excel/convert-file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      this.jsonFile = response.data
      this.clearFiles()
    },

    handleConvertFile() {
      this.file = this.$refs.file
    },

    deleteExcel() {
      this.$refs.deleteModal.show()
    },

    async deleteConfirmed() {
      this.jsonFile = {}
      this.$refs.deleteModal.hide()
    },

    async importSettings(filename) {
      // const response = this.axios.get(`${API}/excel/file/${filename}`);
      // console.log(response);
      // response.then(result => console.log('Result: ' + result));
    }
  }
}
</script>

<style scoped>
</style>

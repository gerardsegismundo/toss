<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <h3>Response</h3>
      </b-col>
      <b-col>
        <!-- <input type="text">
        <select>
          <option value="phrasing">phrasing</option>
          <option value="response">response</option>
          <option value="entities">entities</option>
        </select>-->
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <button class="btn btn-primary" @click="showAddModal">
          &nbsp;create response&nbsp;&nbsp;
          <i class="fa fa-plus-circle"></i>
        </button>
      </b-col>
      <div></div>
    </b-row>
    <b-card v-for="response in responseData" :key="response._id" class="mb-3">
      <b-row>
        <b-col>
          <p>
            <span class="label">phrasing:</span>
            &nbsp;
            {{ response.phrasing }}
          </p>
          <p>
            <span class="label">response:</span>
            &nbsp;
            {{ response.content }}
          </p>
          <p>
            <span class="label">entities:</span>&nbsp;
            <span v-for="(entity, i) in response.entities" :key="i">{{entity}}&nbsp;</span>
          </p>
        </b-col>

        <b-col cols="1" class="d-flex flex-row-reverse">
          <i class="fa fa-trash-alt i-btn" @click="deleteResponse(response._id)"></i>
          <i class="fa fa-pencil-alt edit-response mr-2 i-btn" @click="editResponse(response._id)"></i>
        </b-col>
      </b-row>
    </b-card>
    <!-- DELETE MODAL -->
    <b-modal size="sm" ref="deleteModal" hide-footer>
      <h5 class="d-block text-center">Are you sure you want to delete?</h5>
      <b-btn class="mt-3" variant="danger" block @click="deleteConfirmed">Yes</b-btn>
    </b-modal>

    <!-- ADD MODAL -->
    <b-modal size="m" ref="addModal" hide-footer title="Add response">
      <b-input-group prepend="Entity" class="mb-4" @keyup.enter="addEntity">
        <b-form-input v-model="entity"></b-form-input>
        <b-input-group-append>
          <button class="btn btn-primary" @click="addEntity">
            <i class="fa fa-plus"></i>
          </button>
        </b-input-group-append>
      </b-input-group>
      <label for="entities">Entities:&nbsp;</label>
      <span class="badge" v-for="(entity, i) in entities" :key="i">
        {{ entity }}
        <i
          v-show="entity"
          class="fa fa-times text-danger"
          @click="removeEntity(i)"
        >&nbsp;&nbsp;</i>
      </span>
      <hr>
      <label for="phrasing">Phrasing:</label>
      <b-form-textarea v-model="phrasing" :rows="5" :max-rows="20"></b-form-textarea>
      <br>
      <label for="response">Response:</label>
      <b-form-textarea v-model="response" :rows="5" :max-rows="20"></b-form-textarea>

      <button class="btn btn-primary w-100 mt-4" @click="addResponse">Submit</button>
    </b-modal>

    <!-- EDIT MODAL -->
    <b-modal size="m" ref="editModal" hide-footer title="Edit">
      <b-input-group prepend="Entity" class="mb-4" @keyup.enter="addEditEntity">
        <b-form-input v-model="editData.entity"></b-form-input>
        <b-input-group-append>
          <button class="btn btn-primary" @click="addEditEntity">
            <i class="fa fa-plus"></i>
          </button>
        </b-input-group-append>
      </b-input-group>
      <label for="entities">Entities:&nbsp;</label>
      <span class="badge" v-for="(entity, i) in editData.entities" :key="i">
        {{ entity }}
        <i
          v-show="entity"
          class="fa fa-times text-danger"
          @click="removeEditEntity(i)"
        >&nbsp;&nbsp;</i>
      </span>
      <hr>
      <label for="phrasing">Phrasing:</label>
      <b-form-textarea v-model="editData.phrasing" :rows="5" :max-rows="20"></b-form-textarea>
      <br>
      <label for="response">Response:</label>
      <b-form-textarea v-model="editData.content" :rows="5" :max-rows="20"></b-form-textarea>
      <button class="btn btn-primary w-100 mt-5" @click="updateResponse(editData._id)">Submit</button>
    </b-modal>
  </div>
</template>
<script>
import { API_RESPONSE_DATA } from '@/../config/server.js'

export default {
  data() {
    return {
      response: '',
      phrasing: '',
      entity: '',
      entities: [],
      deleteId: '',
      responseData: {},
      editData: {},
      displayStatus: 'inline'
    }
  },
  methods: {
    showAddModal() {
      this.entity = ''
      this.entities = []
      this.$refs.addModal.show()
    },

    addEntity() {
      if (!this.entity) return
      this.entities.push(this.entity.toLowerCase())
      this.entity = ''
    },

    addEditEntity() {
      if (!this.editData.entity) return
      this.editData.entities.push(this.editData.entity.toLowerCase())
      this.editData.entity = ''
    },

    removeEntity(i) {
      this.entities.splice(i, 1, '')
      this.entities = this.entities.filter(e => e)
    },

    removeEditEntity(i) {
      this.editData.entities.splice(i, 1, '')
      this.editData.entities = this.editData.entities.filter(e => e)
    },

    async addResponse() {
      await this.axios.post(API_RESPONSE_DATA, {
        phrasing: this.phrasing,
        entities: this.entities,
        content: this.response
      })

      this.$notify({
        group: 'success',
        title: 'Add Response',
        text: `Response created successfully.`
      })

      this.phrasing = ''
      this.response = ''
      this.entity = ''

      this.getResponseData()
      this.$refs.addModal.hide()
    },

    async editResponse(id) {
      this.$refs.editModal.show()
      console.log('edit')
      const response = await this.axios.get(`${API_RESPONSE_DATA}/${id}`)

      this.editData = response.data
    },

    async updateResponse() {
      this.$refs.editModal.hide()
      const update = await this.axios.patch(API_RESPONSE_DATA, this.editData)

      if (!update) {
        this.$notify({
          group: 'error',
          title: 'Update Response',
          text: `Updating response failed.`
        })
      } else {
        this.$notify({
          group: 'success',
          title: 'Update Response',
          text: `Respose has been updated.`
        })
      }

      this.getResponseData()
    },

    deleteResponse(id) {
      this.deleteId = id
      this.$refs.deleteModal.show()
    },

    async deleteConfirmed() {
      const deleteR = await this.axios.delete(
        `${API_RESPONSE_DATA}/${this.deleteId}`
      )

      if (!deleteR) {
        this.$notify({
          group: 'error',
          title: 'Delete Response',
          text: `Delete response failed.`
        })
      } else {
        this.$notify({
          group: 'success',
          title: 'Delete Response',
          text: `Delete response successfull.`
        })
      }

      this.getResponseData()
      this.$refs.deleteModal.hide()
      this.deleteId = ''
    },

    async getResponseData() {
      const response = await this.axios.get(API_RESPONSE_DATA)
      this.responseData = response.data
    }
  },

  beforeMount() {
    this.getResponseData()
  }
}
</script>
<style scoped>
</style>
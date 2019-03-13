<template>
  <div>
    <h3 class="mb-4">Watson Assistant v1</h3>
    <b-card class="mb-5">
      <header>
        Credentials
        <span class="text-success hov" @click="showCredential = !showCredential">
          {{ showCredential? 'Hide' : 'Show'}}&nbsp;Credentials
          <i
            class="fas"
            :class="[showCredential? 'fa-eye-slash': 'fa-eye']"
          ></i>
        </span>
        <a
          href="https://console.bluemix.net/apidocs/assistant"
          target="_blank"
          class="mr-3 text-success"
        >API Reference</a>
        <a
          href=" https://console.bluemix.net/dashboard/apps/"
          target="_blank"
          class="mr-3 text-success"
        >IBM Dashboard</a>
      </header>
      <div class="card-body">
        <!--  -->
        <!--  -->
        <!-- <credentials-form-row
          :type="showCredential? 'text' : 'password'"
          labelFor="api"
          label="API Key"
          :credentials="credentials.apiKey"
          @keyup="showOptions = true"
        />-->
        <!--  -->
        <!--  -->
        <b-row class="mb-4">
          <b-col cols="2" class="mt-1">
            <label for="api">API Key:&nbsp;</label>
          </b-col>
          <b-col>
            <input
              required
              class="form-control"
              :type="showCredential? 'text' : 'password'"
              v-model="credentials.apiKey"
              autocomplete="new-password"
              @keyup="showOptions = true"
            >
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col cols="2" class="mt-1">
            <label for="url">URL:&nbsp;</label>
          </b-col>
          <b-col>
            <input
              required
              class="form-control"
              type="url"
              v-model="credentials.url"
              @keyup="showOptions = true"
            >
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col cols="2" class="mt-1">
            <label for="api">Version:&nbsp;</label>
          </b-col>
          <b-col>
            <datepicker @selected="showOptions = true" v-model="credentials.version"/>
          </b-col>
        </b-row>

        <b-row class="mb-4">
          <b-col cols="2" class="mt-1">
            <label for="url">Workspace ID:&nbsp;</label>
          </b-col>
          <b-col>
            <input
              required
              class="form-control"
              type="text"
              v-model="credentials.workspaceId"
              @keyup="showOptions = true"
            >
          </b-col>
        </b-row>
      </div>
      <b-card-footer v-if="showOptions" class="d-flex justify-content-end mt-2 pr-4">
        <button class="btn btn-pale btn-micro mr-4" v-if="shouldRegister">Cancel</button>
        <button v-else class="btn btn-pale btn-micro mr-4" @click="cancelUpdate">Cancel</button>
        <button
          class="btn btn-primary btn-micro"
          v-if="shouldRegister"
          @click="createCredentials"
        >Register</button>
        <button v-else class="btn btn-primary btn-micro" @click="updateCredentials">Update</button>
      </b-card-footer>
    </b-card>
    <hr>
    <b-row class="mt-4 mb-1">
      <b-col>
        <h3>Skills</h3>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <button class="btn btn-primary" v-b-modal.createModal>Create new</button>
      </b-col>
    </b-row>

    <assistant-workspace :workspaces="workspaces" @onGetWorkspaces="getWorkSpaces"/>

    <!-- MODAL CREATE SKILL -->
    <b-modal size="m" ref="createModal" id="createModal" hide-footer title="Create skill">
      <div class="px-4 pt-2">
        <form @submit.prevent="createWorkspace">
          <label for="name">Name:&nbsp;</label>

          <b-form-input v-model="skillName" required/>

          <button class="btn btn-primary w-100 mt-4">CREATE</button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { API_WATSONS_WORKSPACE } from '@/../config/server.js'
import { API_WATSONS_CREDENTIALS } from '@/../config/server.js'

import credentialsFormRow from '@/components/admin/Credentials.formRow.vue'
import assistantWorkspace from '@/components/admin/AssistantWorkspace.vue'
import datepicker from 'vuejs-datepicker'

export default {
  name: 'assistantComponent',
  data() {
    return {
      shouldRegister: false,
      showOptions: false,
      showCredential: false,
      workspaces: [],
      skillName: '',
      credentials: {
        apiKey: '',
        url: '',
        version: '',
        workspaceId: ''
      },
      intents: []
    }
  },

  methods: {
    cancelUpdate() {
      this.getCredentials()
      this.showOptions = false
    },

    async getCredentials() {
      const credentials = await this.axios.get(API_WATSONS_CREDENTIALS)
      // console.log(credentials)
      if (credentials.data === '') {
        return (this.shouldRegister = true)
      }

      this.credentials = credentials.data
    },

    async createCredentials() {
      await this.axios.post(API_WATSONS_CREDENTIALS, this.credentials)

      this.showOptions = false
    },

    async updateCredentials(newValue, credential) {
      const res = await this.axios.put(
        API_WATSONS_CREDENTIALS,
        this.credentials
      )

      this.showOptions = false
    },

    async getWorkSpaces() {
      const res = await this.axios.get(API_WATSONS_WORKSPACE)

      if (res.data === null || res.data === '') {
        return (this.shoudRegister = true)
      }

      console.log(res.data)

      this.workspaces = res.data.workspaces
    },

    async createWorkspace() {
      this.$refs.createModal.hide()

      await this.axios.post(API_WATSONS_WORKSPACE, {
        workspace: this.skillName
      })

      this.skillName = ''
      this.getWorkSpaces()
    }
  },

  beforeMount() {
    this.getCredentials()
    this.getWorkSpaces()
  },

  components: {
    credentialsFormRow,
    assistantWorkspace,
    datepicker
  }
}
</script>




<style scoped>
header {
  margin: -1.25rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  background-color: rgba(0, 0, 0, 0.02);
  font-size: 1.25rem;
  font-weight: 350;
}

.card {
  padding: 0;
}

header a,
header span {
  margin-top: 0.3rem;
  float: right;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: underline;
  /* color: var(--vuestic-green); */
}

span.hov:hover {
  color: #1e7e34 !important;
}

.card-footer {
  margin: -1.25rem;
  background-color: rgba(0, 0, 0, 0.02);
}

i {
  color: rgba(34, 34, 34, 0.7);
}

.hov:hover i {
  color: rgba(34, 34, 34, 1);
}

.workspace-item .card {
  padding: 0 0 2rem 0.5rem;
  border-left: 4px solid var(--vuestic-green);
  border-bottom: 2px solid white;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transition: 0.5s;
}

.workspace-item .card:hover {
  cursor: pointer;
  border-bottom: 2px solid lightgrey;
  border-top: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
}

.workspace-header {
  margin-bottom: 2rem;
  font-weight: 350;
  font-size: 1.2rem;
}

.workspace-menu {
  margin-top: -0.5rem;
  margin-right: -1rem;
  color: rgba(34, 34, 34, 0.5);
}

.workspace-menu:hover {
  transition: all 0.3s;
  color: rgba(34, 34, 34, 0.8);
}
</style>


<style>
/* -- date picker modification -- */

.vdp-datepicker input {
  width: 100%;
  border: 1px solid #ced4da;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
}

.vdp-datepicker__calendar .cell.selected,
.vdp-datepicker__calendar .cell.selected:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover {
  background: var(--vuestic-green);
}
</style>
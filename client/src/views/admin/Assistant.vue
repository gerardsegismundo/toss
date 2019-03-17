<template>
  <div>
    <h3 class="mb-4">Watson Assistant v1</h3>
    <b-card class="card-credential mb-5">
      <header>
        Credentials
        <span
          class="text-success hov"
          @click="showCredential = !showCredential"
        >
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
        <b-form v-if="!isLoading.credentials">
          <b-form-row></b-form-row>
          <b-row class="mb-4">
            <b-col cols="2" class="mt-1">
              <label for="api">API Key:&nbsp;</label>
            </b-col>
            <b-col>
              <input
                required
                autocomplete="off"
                class="form-control"
                :type="showCredential? 'text' : 'password'"
                v-model="credentials.apiKey"
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
              <datepicker
                v-model="credentials.version"
                @dp-hide="showOptions = true"
                :config="options"
              ></datepicker>
            </b-col>
          </b-row>
        </b-form>
        <spinner v-else :message="loadingMessage.credentials" class="mt-5"/>
        <b-row class="mb-4" v-if="!shouldRegister">
          <b-col cols="2" class="mt-1">
            <label for="url">Skill:&nbsp;</label>
          </b-col>
          <b-col>
            <b-form-select
              :disabled="isLoading.skills? true : false"
              v-model="workspace.selected"
              :options="workspace.options"
              @change="showOptions = true"
            >
              <template slot="first">
                <option :value="{}" disabled>-- Please select an option --</option>
              </template>
            </b-form-select>
            <!-- <input
              class="form-control"
              type="text"
              v-model="credentials.workspaceId"
              @keyup="showOptions = true"
            >-->
          </b-col>
        </b-row>
        <b-row
          v-if="shouldRegister && !isLoading.credentials"
          class="register-link-row d-flex justify-content-end mr-1"
        >
          <p class="text-secondary">
            No account yet? Register
            <a href class="text-success">here.</a>
          </p>
        </b-row>
      </div>
      <b-card-footer
        v-if="showOptions || shouldRegister  && !isLoading.credentials"
        class="d-flex justify-content-end pr-4"
        :class="[shouldRegister? '' : 'mt-2' ]"
      >
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
    <b-row class="mt-4 mb-1" v-if="!shouldRegister">
      <b-col>
        <h3>Skills</h3>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <button
          class="btn btn-primary"
          v-b-modal.createModal
          :disabled="isLoading.skills? true : false"
        >Create new</button>
      </b-col>
    </b-row>

    <!-- ASSISTANT WORKSPACE -->
    <div class="workspace-wrapper">
      <transition
        name="fade"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="isLoading.skills"
      >
        <spinner v-show="isLoading.skills" :message="loadingMessage.skills" class="my-4"/>
      </transition>

      <transition
        v-show="!isLoading.skills"
        name="fade"
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <assistant-workspace
          v-show="!isLoading.skills"
          :workspaces="workspaces"
          @onGetWorkspaces="getWorkSpaces"
          @spinnerOn="spinnerOn"
          @spinnerOff="spinnerOff"
        />
      </transition>
    </div>
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
import spinner from '@/components/admin/Spinner.vue'

import datepicker from 'vue-bootstrap-datetimepicker'
import { setTimeout } from 'timers'

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
        workspaceId: '',
        workspaceName: ''
      },
      workspace: {
        selected: {},
        options: []
      },
      intents: [],
      options: {
        format: 'YYYY-MM-DD',
        useCurrent: false
      },
      loadingMessage: {
        credentials: '',
        skills: ''
      },
      isLoading: {
        credentials: false,
        skills: false
      }
    }
  },

  methods: {
    spinnerOn(message, context = 'skills') {
      if (context === 'credentials') {
        this.loadingMessage.credentials = message
        this.isLoading.credentials = true
      } else {
        this.isLoading.skills = true
        this.loadingMessage.skills = message
      }
    },

    spinnerOff(context = 'skills') {
      if (context === 'credentials') this.isLoading.credentials = false
      this.isLoading.skills = false
    },

    async getCredentials() {
      const credentials = await this.axios.get(API_WATSONS_CREDENTIALS)

      if (credentials.data === '') return (this.shouldRegister = true)

      this.credentials = credentials.data
      this.workspace.selected.name = this.credentials.workspaceName
      this.workspace.selected.id = this.credentials.workspaceId
    },

    async createCredentials() {
      this.spinnerOn('Creating credentials... ', 'credentials')

      const create = await this.axios.post(
        API_WATSONS_CREDENTIALS,
        this.credentials
      )

      if (!create) {
        this.$notify({
          group: 'error',
          title: 'Credentials Registration',
          text: `Credentials registration error!`
        })
      } else {
        this.$notify({
          group: 'success',
          title: 'Credentials Registration',
          text: `Credentials registered successfully!`
        })
      }

      this.spinnerOff('credentials')
      this.getWorkSpaces()
      this.showOptions = false
    },

    async updateCredentials(newValue, credential) {
      this.credentials.workspaceId = this.workspace.selected.id
      this.credentials.workspaceName = this.workspace.selected.name

      console.log(this.credentials)

      const res = await this.axios.put(
        API_WATSONS_CREDENTIALS,
        this.credentials
      )

      if (!res) {
        this.$notify({
          group: 'success',
          title: 'Credentials Update',
          text: `Updating credentials failed!`
        })
      } else {
        this.$notify({
          group: 'success',
          title: 'Credentials Update',
          text: `Updating credentials success!`
        })
      }

      this.showOptions = false
    },

    async getWorkSpaces() {
      this.spinnerOn('Loading skills...')

      const res = await this.axios.get(API_WATSONS_WORKSPACE)

      if (res.data === null || res.data === '') {
        return (this.shoudRegister = true)
      }

      this.spinnerOff()
      this.workspaces = res.data.workspaces

      this.workspace.options = []
      this.workspaces.map(workspace => {
        this.workspace.options.push({
          text: workspace.name,
          value: {
            name: workspace.name,
            id: workspace.workspace_id
          }
        })
      })
    },

    async createWorkspace() {
      this.$refs.createModal.hide()
      this.spinnerOn(`Creating ${this.skillName}...`)

      const createSkill = await this.axios.post(API_WATSONS_WORKSPACE, {
        workspace: this.skillName
      })

      if (!createSkill) {
        return this.$notify({
          group: 'error',
          title: 'Create Skill Error',
          text: `Creating skill ${this.skillName} has failed.`
        })
      }

      this.$notify({
        group: 'success',
        title: 'Create Skill Success',
        text: `Skill ${this.skillName} has been successfully created.`
      })

      this.skillName = ''
      this.getWorkSpaces()
    },

    cancelUpdate() {
      this.getCredentials()
      this.showOptions = false
    }
  },

  beforeMount() {
    this.getCredentials()
    this.getWorkSpaces()
  },

  updated() {
    if (this.shouldRegister) this.isLoading.skills = false
  },
  components: {
    credentialsFormRow,
    assistantWorkspace,
    datepicker,
    spinner
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

.card-credential {
  min-height: 384px;
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

.register-link-row {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.register-link-row a {
  text-decoration: underline;
  font-weight: 600;
}

.workspace-wrapper {
  min-height: 270px;
  transition: 0.5s;
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


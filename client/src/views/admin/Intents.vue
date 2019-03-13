<template>
  <div>
    <h3>{{ skill.name }}</h3>
    <p class="text-secondary mb-4">Conducts a conversation via textual method.</p>
    <b-card>
      <button class="btn btn-primary mb-4" v-b-modal.addModal>Add intent</button>

      <table class="table table-striped table-hover">
        <thead>
          <th>Intent</th>
          <th>Description</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(intent, i) in intents" :key="i">
            <td
              class="hov"
              width="40%"
              @click="getIntent(intent.intent, intent.description)"
            ># {{ intent.intent }}</td>
            <td width="50%">{{ intent.description }}</td>
            <td width="10%">
              <i class="fas fa-pencil-alt" @click="editIntent"></i>
              &nbsp;&nbsp;
              <i class="fas fa-trash-alt" @click="deleteIntent"></i>
            </td>
          </tr>
        </tbody>
      </table>

      <b-card v-show="intent.name">
        <p>Name: {{intent.name}}</p>
        <p>Description: {{intent.description}}</p>

        <div v-if="intent.examples.length > 0">
          <p v-for="(example, i) in intent.examples" :key="'example'+i">{{ example.text }}</p>
        </div>

        <div else>No examples yet.</div>
      </b-card>
    </b-card>

    <b-modal size="m" id="addModal" ref="addModal" hide-footer title="Add intent">
      <div class="px-4 pt-2">
        <b-form-group>
          <label for="intent-name">Intent name:</label>
          <b-form-input v-model="create.intent"/>
        </b-form-group>

        <b-form-group>
          <label for="description">Description:</label>
          <b-form-input v-model="create.description"/>
        </b-form-group>

        <label for="user-examples">Add user examples:</label>
        <b-input-group class="mb-4" @keyup.enter="addExample">
          <b-form-input v-model="create.userExample"></b-form-input>
          <b-input-group-append>
            <button class="btn btn-primary" @click="addExample">
              <i class="fa fa-plus"></i>
            </button>
          </b-input-group-append>
        </b-input-group>

        <hr>

        <div v-if="create.userExamples.length > 0">
          <ul v-for="(example, i) in create.userExamples" :key="i">
            <li>{{ example }}</li>
          </ul>
        </div>

        <div v-else>
          <p class="lead">No examples yet</p>
          <p class="text-secondary">{{ msg }}</p>
        </div>

        <button class="btn btn-primary w-100 mt-4" @click="createIntent">Create</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { API_WATSONS } from '@/../config/server.js'

export default {
  data() {
    return {
      msg:
        'Train your virtual assistant with this intent by adding unique examples of what your users would say.',
      skill: {
        id: '',
        name: ''
      },
      intent: {
        name: '',
        description: '',
        examples: []
      },
      intents: [],
      create: {
        intent: '',
        description: '',
        userExample: '',
        userExamples: []
      }
    }
  },

  methods: {
    getRouteParams() {
      this.skill.name = this.$route.params.name
      this.skill.id = this.$route.params.id
    },

    async getIntents() {
      const res = await this.axios.get(
        `${API_WATSONS}/list-intents/${this.skill.id}`
      )

      this.intents = res.data
    },

    async getIntent(name, description) {
      this.intent.name = name
      this.intent.description = description

      const params = {
        workspace_id: this.skill.id,
        intent: name
      }

      const res = await this.axios.get(`${API_WATSONS}/intent/`, {
        params
      })

      this.intent.examples = res.data.examples
    },

    addExample() {
      const payload = { text: this.create.userExample }
      this.create.userExamples.push(payload)
      this.create.userExample = ''
    },

    async createIntent() {
      const payload = {
        workspace_id: this.skill.id,
        intent: this.create.intent,
        description: this.create.description,
        examples: this.create.userExamples
      }

      const api = `${API_WATSONS}/create-intent`
      const res = await this.axios.post(api, payload)
      console.log(res)

      this.getIntents()

      this.create.intent = ''
      this.create.description = ''
      this.$refs.addModal.hide()
    },

    editIntent() {},

    deleteIntent() {}
  },

  created() {
    this.getRouteParams()
    this.getIntents()
  }
}
</script>


<style scoped>
.card {
  padding: 0;
}
.table-wrapper {
  background-color: #ffffff;
}
thead {
  background-color: rgba(0, 255, 0, 0.1);
}

i.fas {
  font-size: 0.9rem;
  opacity: 0;
}

tr:hover i.fas {
  opacity: 0.5;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>

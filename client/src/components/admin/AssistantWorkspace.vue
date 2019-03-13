<template>
  <div>
    <b-row class="workspace-item">
      <b-col v-for="workspace in workspaces" :key="workspace.workspace_id" cols="4" class="mt-4">
        <b-card @click="viewSkill(workspace.name,workspace.workspace_id)">
          <div class="workspace-header">
            <b-row>
              <b-col>
                <p>{{ workspace.name }}</p>
              </b-col>
              <b-col>
                <b-dropdown
                  variant="link"
                  size="sm"
                  no-caret
                  dropright
                  class="d-flex flex-row-reverse"
                >
                  <template slot="button-content">
                    <i class="workspace-menu d-flex flex-row-reverse fas fa-ellipsis-v"></i>
                  </template>
                  <b-dropdown-item
                    v-on:click.stop="onRename(workspace.name, workspace.workspace_id)"
                  >Rename</b-dropdown-item>
                  <b-dropdown-item @click="onDelete(workspace.workspace_id)">Delete</b-dropdown-item>
                </b-dropdown>
              </b-col>
            </b-row>
          </div>
          <p>Workspace ID:</p>
          <p class="text-secondary">{{ workspace.workspace_id }}</p>
        </b-card>
      </b-col>
    </b-row>

    <!-- MODAL RENAME SKILL -->
    <b-modal size="m" ref="renameModal" hide-footer title="Rename skill">
      <div class="px-4 pt-2">
        <form @submit.prevent="renameWorkspace">
          <label for="name">Name:&nbsp;</label>

          <b-form-input v-model="onRenameModal.name" required/>

          <button class="btn btn-primary w-100 mt-4">Rename</button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { API_WATSONS_WORKSPACE } from '@/../config/server.js'

export default {
  name: 'AssistantWorkspace',
  data() {
    return {
      intents: {},
      onRenameModal: {
        id: '',
        name: ''
      }
    }
  },
  props: ['workspaces'],
  methods: {
    onDelete(id) {
      this.$emit('onDelete', id)
    },

    viewSkill(name, id) {
      this.$router.push({ name: 'Intents', params: { name, id } })
    },

    onRename(name, id) {
      this.onRenameModal.name = name
      this.onRenameModal.id = id
      this.$refs.renameModal.show()
    },

    async renameWorkspace() {
      this.$refs.renameModal.hide()

      const payload = {
        workspace_id: this.onRenameModal.id,
        name: this.onRenameModal.name
      }

      await this.axios.patch(API_WATSONS_WORKSPACE, payload)
      this.$emit('onGetWorkspaces')
    },

    async onDelete(id) {
      const res = await this.axios.delete(`${API_WATSONS_WORKSPACE}/${id}`)

      this.$emit('onGetWorkspaces')
    }
  }
}
</script>


<style scoped>
.workspace-item .card {
  padding: 0 0 2rem 0.5rem;
  border-left: 4px solid var(--vuestic-green);
  border-bottom: 2px solid white;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transition: 0.5s;
  z-index: 0;
  opacity: 1;
}

.workspace-item .card:hover {
  cursor: pointer;
  border-bottom: 2px solid lightgrey;
  border-top: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
}

.workspace-item button {
  z-index: 1;
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
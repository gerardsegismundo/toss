<template>
  <div>
    <h3 class="mb-4">Discovery-8r</h3>
    <b-card class="mb-5">
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
              @keyup="showUpdate = true"
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
              type="text"
              v-model="credentials.url"
              @keyup="showUpdate = true"
            >
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col cols="2" class="mt-1">
            <label for="api">Version:&nbsp;</label>
          </b-col>
          <b-col>
            <input
              required
              class="form-control"
              type="text"
              v-model="credentials.version"
              @keyup="showUpdate = true"
            >
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
              @keyup="showUpdate = true"
            >
          </b-col>
        </b-row>
      </div>
      <b-card-footer v-if="showUpdate" class="d-flex justify-content-end mt-2 pr-4">
        <button class="btn btn-pale btn-micro mr-4" @click="cancelUpdate">Cancel</button>
        <button class="btn btn-primary btn-micro" @click="updateCredentials">Update</button>
      </b-card-footer>
    </b-card>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCredential: false,
      credentials: {
        apiKey: '',
        version: '',
        worksapceId: ''
      }
    }
  },
  methods: {
    showUpdate() {},
    cancelUpdate() {},
    updateCredentials() {}
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
</style>

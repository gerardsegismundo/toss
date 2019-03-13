<template>
  <div class="admin-container">
    <app-header/>
    <div>
      <b-row class="my-4 mx-4">
        <b-col xl="2" lg="4" class="sidebar-col">
          <app-sidebar/>
        </b-col>
        <b-col xl="10" lg="8" class="view-col">
          <router-view></router-view>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'

export default {
  name: 'ConfigAdmin',
  data() {
    return {}
  },
  methods: {},
  components: {
    appHeader: Header,
    appSidebar: Sidebar
  }
}
</script>



<style>
.admin-container {
  min-height: 100vh !important;
  background-color: var(--light-bg);
  padding-bottom: 2rem;
}

.admin-container .i-btn {
  background-color: var(--light-bg);
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 0.15rem;
  height: 30px;
  padding: 5px 6px 5px 8px;
  color: var(--special-color);
  opacity: 0;
  font-size: 12px;
  text-align: center;
  line-height: 1rem;
  margin-top: -1.5rem;
  margin-right: -1.5rem;
  box-shadow: 3px 3px 10px rgba(43, 43, 43, 0.3);
  cursor: pointer;
}

.admin-container .card:hover .i-btn {
  opacity: 0.5;
}

.admin-container .i-btn:hover {
  box-shadow: 0px 0px 10px rgba(43, 43, 43, 0.7);
  border: 1px solid rgba(34, 34, 34, 0.3);
  opacity: 0.7 !important;
}

h3 {
  font-size: 2.25rem;
  line-height: 1.25;
  font-weight: 300;
}

.sidebar-col {
  padding-right: 4rem;
}

span.label {
  font-weight: 600;
}

.view-col {
  margin-top: 2rem;
  padding-right: 1rem;
}
</style>
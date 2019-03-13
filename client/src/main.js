import Vue from 'vue'

// Bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import { store } from './store/index.js'

// Axios and Vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// v-click-outside
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

// Vue-2 Animate.css
require('vue2-animate/dist/vue2-animate.min.css')

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')

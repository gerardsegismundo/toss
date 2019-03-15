import Vue from 'vue'

// Bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Datepicker-bootstrap
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
Vue.use(datePicker)

// Vue-notification
import Notifications from 'vue-notification'
Vue.use(Notifications)

// Vuex
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

// Animate.css depedency
import animate from 'animate.css'
Vue.use(animate)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')

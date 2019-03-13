import Vue from 'vue'
import Router from 'vue-router'

// Client Router View
import Home from '@/views/client/Home'
import TestArtifacts from '@/views/client/TestArtifacts'
import Metrics from '@/views/client/Metrics'
import Automation from '@/views/client/Automation'
import ReferenceMaterial from '@/views/client/ReferenceMaterial'
import ContactUs from '@/views/client/ContactUs'
import PageNotFound from '@/views/client/PageNotFound'

// Admin Router View
import AdminDashboard from '@/views/admin/AdminDashboard'
import Response from '@/views/admin/Response'
import Filtered from '@/views/admin/Filtered'
import Excels from '@/views/admin/Excels'
import Assistant from '@/views/admin/Assistant'
import Intents from '@/views/admin/Intents'
import Discovery from '@/views/admin/Discovery'

// Auth
import Auth from '@/views/admin/auth/Auth'
import Login from '@/views/admin/auth/Login'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/test-artifacts',
			name: 'TestArtifacts',
			component: TestArtifacts
		},
		{
			path: '/metrics',
			name: 'Metrics',
			component: Metrics
		},
		{
			path: '/automation',
			name: 'Automation',
			component: Automation
		},
		{
			path: '/reference-materials',
			name: 'ReferenceMaterials',
			component: ReferenceMaterial
		},
		{
			path: '/contact-us',
			name: 'ContactUs',
			component: ContactUs
		},

		{
			path: '/auth',
			component: Auth,
			children: [
				{
					path: 'login',
					name: 'Login',
					component: Login
				}
			]
		},

		{
			path: '/admin-dashboard',
			component: AdminDashboard,
			children: [
				{
					path: '',
					name: 'Assistant',
					component: Assistant
				},

				{
					path: 'intents/:name/:id',
					name: 'Intents',
					component: Intents
				},

				{
					path: 'discovery',
					name: 'Discovery',
					component: Discovery
				},

				{
					path: 'response',
					name: 'Response',
					component: Response
				},
				{
					path: 'filtered',
					name: 'Filtered',
					component: Filtered
				},
				{
					path: 'excels',
					name: 'Excels',
					component: Excels
				}
			]
		},

		{ path: '*', component: PageNotFound }
	]
})

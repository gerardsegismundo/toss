import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isLoading: false,
		isActive: false,
		allMessages: []
		// credentials: {
		// 	apiKey: '',
		// 	url: '',
		// 	version: '',
		// 	workspaceId: ''
		// }
	},

	getters: {
		allMessages: (state) => state.allMessages,
		isActive: (state) => state.isActive,
		isLoading: (state) => state.isLoading
		// credentials: (state) => state.credentials
	},

	mutations: {
		greetUser(state) {
			setTimeout(() => {
				state.allMessages.unshift({
					sender: 'bot',
					content: { text: 'Hi! How may I help you?' }
				})
			}, 700)
		},

		storeMessage: (state, payload) => state.allMessages.push(payload),
		removeLoader: (state) => state.allMessages.pop(),
		clearMessages: (state) => (state.allMessages = []),
		isClicked: (state, payload) => {
			if (payload == true) {
				document.body.style.overflow = 'hidden'
				return (state.isActive = true)
			}
			document.body.style.overflow = 'auto'
			state.isActive = false
		},
		setLoading: (state, payload) => (state.isLoading = payload)
		// updateCrentials: (state, payload) => (state.credentials = payload)
	},

	actions: {
		greetUser: (context) => context.commit('greetUser'),
		storeMessage: (context, payload) =>
			context.commit('storeMessage', payload),
		removeLoader: (context) => context.commit('removeLoader'),
		clearMessages: (context) => context.commit('clearMessages'),
		isClicked: (context, payload) => context.commit('isClicked', payload),
		setLoading: (context, payload) => context.commit('setLoading', payload)
		// updateCredentials: (context, payload) => context.commit('updateCredentials', payload)
	}
})

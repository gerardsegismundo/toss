if (process.env.NODE_ENV === 'production') {
	module.exports = {
		// API_URL: 'https://tmny-server.herokuapp.com/',
		// ADMIN_API: 'http://localhost:5000/api/config-admin',
		mongoURI: process.env.MONGO_URI
	}
} else {
	module.exports = {
		API: 'http://localhost:5000/api',
		API_RESPONSE_DATA: 'http://localhost:5000/api/response-data',
		API_WATSONS_WORKSPACE: 'http://localhost:5000/api/watson-assistant/workspace',
		API_WATSONS_CREDENTIALS: 'http://localhost:5000/api/watson-assistant/credentials',
		mongoURI: process.env.MONGO_URI
	}
}

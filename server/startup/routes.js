const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const excel = require('../routes/excel')
const response = require('../routes/response')
const responseData = require('../routes/responseData')
const filtered = require('../routes/filtered')
const watsonAssistantIntents = require('../routes/watsonsAssistantIntents')
const watsonAssistantCredentials = require('../routes/watsonAssistantCredentials')
const watsonAssistantWorkspace = require('../routes/watsonAssistantWorkspace')

module.exports = (app) => {
	app.use(cors())
	app.use(helmet())
	app.use(bodyParser.json())
	app.use('/api/excel', excel)
	app.use('/api/filtered', filtered)
	app.use('/api/response', response)
	app.use('/api/response-data', responseData)
	app.use('/api/watson-assistant/intents', watsonAssistantIntents)
	app.use('/api/watson-assistant/workspace', watsonAssistantWorkspace)
	app.use('/api/watson-assistant/credentials', watsonAssistantCredentials)
}

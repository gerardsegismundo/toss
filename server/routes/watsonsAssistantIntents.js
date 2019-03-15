const express = require('express')
const router = express.Router()
const watson = require('watson-developer-cloud')
const { Credentials } = require('../models/Credentials')

async function watsonAssistant() {
	const credentials = await Credentials.findOne({ service: 'assistant' })
	console.log(credentials)

	const { apiKey, url, version } = credentials

	const assistant = new watson.AssistantV1({
		iam_apikey: apiKey,
		version,
		url
	})

	return assistant
}

// @route GET /list-intents/:id
// @desc get list intents
router.get('/:id', async (req, res) => {
	const assistant = await watsonAssistant()

	const payload = { workspace_id: req.params.id }

	assistant.listIntents(payload, (err, response) => {
		if (err) return res.status(400).send(err)
		res.send(response.intents)
	})
})

// @route GET /intent
// @desc Get information about an intent.
router.get('/', async (req, res) => {
	const { workspace_id, intent } = req.query
	const payload = {
		workspace_id,
		intent
	}

	const assistant = await watsonAssistant()
	assistant.listExamples(payload, (err, response) => {
		if (err) return res.send(err)
		res.send(response)
	})
})

// @route POST /create-intent
// @desc create an intent
router.post('/', async (req, res) => {
	const assistant = await watsonAssistant()

	const { workspace_id, intent, description, examples } = req.body

	const payload = {
		workspace_id,
		intent,
		description,
		examples
	}

	assistant.createIntent(payload, (err, response) => {
		if (err) return res.send(err)
		res.send(response)
	})
})

module.exports = router

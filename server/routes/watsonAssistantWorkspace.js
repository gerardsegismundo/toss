const express = require('express')
const router = express.Router()
const watson = require('watson-developer-cloud')

async function watsonAssistant() {
	const { Credentials } = require('../models/Credentials')
	const credentials = await Credentials.findOne({ service: 'assistant' })

	if (!credentials) return

	const { apiKey, url, version } = credentials

	const assistant = new watson.AssistantV1({
		iam_apikey: apiKey,
		version,
		url
	})

	return assistant
}

// @route GET /
// @desc GET skills
router.get('/', async (req, res) => {
	const assistant = await watsonAssistant()
	if (!assistant) return res.send(null)

	assistant.listWorkspaces((err, response) => {
		if (err) return res.send(err)
		res.send(response)
		// console.log(response)
		// res.send(response)
	})
})

// @route POST /
// @desc CREATE skill
router.post('/', async (req, res) => {
	const name = req.body.workspace
	const assistant = await watsonAssistant()

	const payload = {
		name,
		// IBM description not working..
		description: ''
	}

	assistant.createWorkspace(payload, (err, response) => {
		if (err) return res.status(400).send(err)
		res.send(response)
	})
})

// @route PATCH /
// @desc UPDATE skill
router.patch('/', async (req, res) => {
	const assistant = await watsonAssistant()
	const { workspace_id, name } = req.body

	const payload = {
		workspace_id,
		name
	}

	assistant.updateWorkspace(payload, (err, response) => {
		if (err) return res.status(400).send(err)

		res.send(response)
	})
})

// @route DELETE /:id
// @desc DELETE skill
router.delete('/:id', async (req, res) => {
	const assistant = await watsonAssistant()

	const payload = { workspace_id: req.params.id }

	assistant.deleteWorkspace(payload, (err, response) => {
		if (err) return res.status(400).res.send(err)
		res.send(response)
	})
})

// @route GET *
// @desc The 404 Route
router.get('*', (req, res) => null)

module.exports = router

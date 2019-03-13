const express = require('express')
const router = express.Router()
const { Credentials } = require('../models/Credentials')

// route POST /
// @desc CREATE credentials
router.post('/', async (req, res) => {
	const { apiKey, url, workspaceId, version } = req.body

	const newCredentials = {
		service: 'assistant',
		apiKey,
		url,
		version,
		workspaceId
	}

	const credential = await new Credentials(newCredentials).save()

	if (!credential) return res.send('Credentials registry failed')
	res.send('CREATED')
})

// @route GET /
// @desc GET credentials
router.get('/', async (req, res) => {
	const credentials = await Credentials.findOne({ service: 'assistant' })
	if (!credentials) return res.send('')

	res.send(credentials)
})

// @route PUT /
// @desc UPDATE credentials
router.put('/', async (req, res) => {
	const { apiKey, url, workspaceId, version } = req.body

	const payload = {
		apiKey,
		url,
		version,
		workspaceId
	}

	const updCredentials = await Credentials.updateOne({ service: 'assistant' }, { $set: payload })

	if (!updCredentials) return res.status(400).send('Updating credentials failed.')

	res.send(updCredentials)
})

module.exports = router

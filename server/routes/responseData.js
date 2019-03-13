const express = require('express')
const router = express.Router()

const { validateResponseUpd, validateRequest, Response } = require('../models/Response')

// @route GET /
// @desc Load responses
router.get('/', async (req, res) => {
	const getResponses = await Response.find({})

	if (!getResponses) return res.status(400).send('Failed loading responses data.')
	res.send(getResponses)
})

// @route GET /response-data/:id
// @desc Load a response
router.get('/:id', async (req, res) => {
	const getResponse = await Response.findOne({ _id: req.params.id })

	if (!getResponse) return res.status(400).send('Response not found')
	res.send(getResponse)
})

// @route POST /
// @desc Add response
router.post('/', async (req, res) => {
	const { phrasing, entities, content } = req.body

	const newResponse = {
		phrasing,
		entities,
		content
	}

	const response = await new Response(newResponse).save()

	if (!response) return res.status(400).send('Adding response failed.')
	res.send(response)
})

// @route PUT /
// @desc Update response
router.patch('/', async (req, res) => {
	const { error } = validateResponseUpd(req.body)
	if (error) return console.log(error.details[0].message)

	const { _id, phrasing, entities, content } = req.body

	const payload = {
		phrasing,
		entities,
		content
	}

	const response = await Response.updateOne({ _id }, { $set: payload })

	if (!response) res.status(400).send('Updating response failed.')
	res.send(response)
})

// @route DELETE /delete-response/:id
// @desc delete response
router.delete('/:id', async (req, res) => {
	const response = await Response.deleteOne({ _id: req.params.id })

	if (!response) return res.status(400).send('Deleting response failed.')
	res.send('Response sucessfully deleted.')
})

// @route GET *
// @desc The 404 Route
router.get('*', (req, res) => null)

module.exports = router

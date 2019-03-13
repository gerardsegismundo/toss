const express = require('express')
const router = express.Router()

const { Filtered } = require('../models/Filtered')

// @route GET /
// @desc GET filtered items.
router.get('/', async (req, res) => {
	const filtered = await Filtered.find({}).sort({ date: 'desc' })
	if (!filtered) return res.status(400).send('Loading error...')

	res.send(filtered)
})

// @route DELETE /:id
// @desc DELETE filtered item.
router.delete('/:id', async (req, res) => {
	const filtered = await Filtered.deleteOne({ _id: req.params.id })
	if (!filtered) return res.status(400).send('The filtered item on the given ID was not found.')

	res.send(filtered)
})

// @route DELETE /delete-all
// @desc DELETE all filtered items
router.delete('/', async (req, res) => {
	const filtered = await Filtered.remove()
	if (!filtered) return res.status(400).send('Deleting all filtered items failed')

	res.send(filtered)
})

// @route GET *
// @desc The 404 Route
router.get('*', (req, res) => null)

module.exports = router

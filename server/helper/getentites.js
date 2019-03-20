const wordPOS = require('wordpos')
const wordpos = new wordPOS()

const { Filtered } = require('../models/Filtered')

async function getEntities(messageArray, request) {
	// Proper nouns
	const properNouns = []

	await messageArray.map((word) => {
		if (/[A-Z]/.test(word[0])) {
			properNouns.push(word)
			return
		}
	})

	// Nouns
	let commonNouns = []
	await wordpos.getNouns(request, (noun) => {
		commonNouns = [ ...noun ]
	})

	// Verbs
	let verbs = []
	await wordpos.getVerbs(request, (verb) => {
		verbs = [ ...verb ]
	})

	// Entities
	let entities = [ ...properNouns, ...commonNouns, ...verbs ].map((word) =>
		word.toLowerCase()
	)
	entities = [ ...new Set(entities) ]

	const filtered = {
		phrasing: request,
		nouns: {
			proper: properNouns,
			common: commonNouns
		},
		verbs,
		entities
	}

	new Filtered(filtered).save()

	return filtered
}

exports.getEntities = getEntities

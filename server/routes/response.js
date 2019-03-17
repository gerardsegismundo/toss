const express = require('express')
const router = express.Router()

const { validateRequest, Response } = require('../models/Response')

// WORDPOS METHOD FOR FILTERS
// const { getEntities } = require('../helper/getentites')
const { fileAccess } = require('../helper/fileAccess')

// @route GET /:request
// @desc Load a Response from a message
router.get('/request/:request', async (req, res) => {
  const { error } = validateRequest(req.params)
  if (error) return res.send(error.details[0].message)

  const { request } = req.params

  // LOCAL RESPONSE
  const messageArray = request.trim().split(' ')

  // FIX - possible solution: map() in $in
  const local = await Response.findOne({ entities: { $in: messageArray } })
    .then(async response => {
      // If entity found.
      if (response) {
        // Count match entities.
        const { entities } = response
        let matchCount = 0

        entities.map(entity => {
          if (messageArray.includes(entity)) {
            matchCount += 1
          }
        })

        // If required entity achieved
        // PROBLEM -- if has matched a single entity, does not look for the next response that has more matched entites
        const requiredEntity = response.entities.length
        if (matchCount >= requiredEntity) return res.send(response.content)

        mongoAccess('text')
      }

      // await getEntities(messageArray, request);
      mongoAccess('text')
    })
    .catch(err => console.log('ERROR LOCAL' + err))

  // WATSON RESPONSE
  /* if (!local) {
    const watson = require('watson-developer-cloud')
    const { Credentials } = require('../models/Credentials')

    const credentials = await Credentials.findOne({ service: 'assistant' })
    const { apiKey, url, workspaceId, version } = credentials

    const conversation = new watson.AssistantV1({
      iam_apikey: apiKey,
      version,
      url
    })

    const payload = {
      workspace_id: workspaceId,
      input: { text: request }
    }

    // Send the input to the conversation service
    conversation.message(payload, (err, data) => {
      if (err) return res.end()

      res.send(data.output[0].text)
    })
  } */
})

// @route POST /search-phrase
// @desc get phrasing suggestion
router.post('/search-phrasing', (req, res) => {
  const { phrasing } = req.body

  if (phrasing == undefined || typeof phrasing !== 'string') return res.end()

  const phrasings = phrasing.trim().split(' ')

  Response.find({ entities: { $in: phrasings.map(e => RegExp(e)) } })
    .sort('phrasing')
    .select('phrasing')
    .limit(5)
    .then(suggestions => res.send(suggestions))
    .catch(err => console.error('SEARCH-PHRASING ERROR: ' + err))
})

// @route GET /entities
// @desc Load entities
router.get('/entities', async (req, res) => {
  const entities = await Response.find({ _id: req.body.id }).select({
    entities: 1
  })

  if (!entities) return res.status(400).send('Response not found.')
  res.send(entities)
})

// @route POST /keyword
// @desc Add Keyword
router.post('/keyword', async (req, res) => {
  const getKeyword = await Response.updateOne(
    { _id: req.body.id },
    { $push: { entities: req.body.keyword } }
  )

  if (!getKeyword) return res.status(400).send('Adding keyword failed.')
  res.status(200).send('Keyword added successfully')
})

// @route GET *
// @desc The 404 Route
router.get('*', (req, res) => null)

module.exports = router

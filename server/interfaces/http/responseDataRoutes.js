const express = require('express');
const router = express.Router();
const responseService = require('../../application/responseService');

// @route GET /
// @desc Get all responses
router.get('/', async (req, res) => {
  const responses = await responseService.getAllResponses();
  res.send(responses);
});

// @route GET /:id
// @desc Get a response by ID
router.get('/:id', async (req, res) => {
  const response = await responseService.getResponseById(req.params.id);
  if (!response) return res.status(400).send('Response not found.');
  res.send(response);
});

// @route POST /
// @desc Create a new response
router.post('/', async (req, res) => {
  try {
    const response = await responseService.createResponse(req.body);
    res.send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route PATCH /
// @desc Update a response
router.patch('/', async (req, res) => {
  try {
    const result = await responseService.updateResponse(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send('Updating response failed.');
  }
});

// @route DELETE /:id
// @desc Delete a response
router.delete('/:id', async (req, res) => {
  const result = await responseService.deleteResponse(req.params.id);
  if (!result) return res.status(400).send('Deleting response failed.');
  res.send('Response successfully deleted.');
});

// @route GET *
// @desc 404 Route
router.get('*', (req, res) => res.end());

module.exports = router;
</write_to_file>
</execute_command>
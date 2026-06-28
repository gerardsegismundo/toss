const express = require('express');
const router = express.Router();
const filteredService = require('../../application/filteredService');

// @route GET /
// @desc Get all filtered items
router.get('/', async (req, res) => {
  const filtered = await filteredService.getAllFiltered();
  if (!filtered) return res.status(400).send('Loading error...');
  res.send(filtered);
});

// @route DELETE /:id
// @desc Delete a filtered item
router.delete('/:id', async (req, res) => {
  const result = await filteredService.deleteFiltered(req.params.id);
  if (!result) return res.status(400).send('The filtered item on the given ID was not found.');
  res.send(result);
});

// @route DELETE /
// @desc Delete all filtered items
router.delete('/', async (req, res) => {
  const result = await filteredService.deleteAllFiltered();
  if (!result) return res.status(400).send('Deleting all filtered items failed');
  res.send(result);
});

// @route GET *
// @desc The 404 Route
router.get('*', (req, res) => res.end());

module.exports = router;
</write_to_file>
</execute_command>
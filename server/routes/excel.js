const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json-lc');
const fs = require('fs');

// Load Model
const { excel } = require('../models/Excel');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './server/uploads/');
	},
	filename: function(req, file, cb) {
		const datetimestamp = Date.now();
		cb(
			null,
			file.fieldname +
				'-' +
				datetimestamp +
				'.' +
				file.originalname.split('.')[file.originalname.split('.').length - 1]
		);
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		if ([ 'xls', 'xlsx' ].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1)
			return callback(new Error('Wrong extension type'));

		callback(null, true);
	}
}).single('file');

// @route POST /convert-file
// @desc convert excel to json files
router.post('/convert-file', (req, res) => {
	let exceltojson;
	upload(req, res, (err) => {
		if (err) return res.send(err);

		if (!req.file) return res.json({ err_desc: 'No file passed' });
		if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx')
			exceltojson = xlsxtojson;
		else exceltojson = xlstojson;

		exceltojson(
			{
				input: req.file.path,
				output: null,
				lowerCaseHeaders: true
			},
			(err, result) => {
				if (err) return res.json({ err_desc: err });

				res.send(result);

				fs.unlink(req.file.path, (err) => console.log(err));
			}
		);
	});
});

// The 404 Route
router.get('*', (req, res) => null);
module.exports = router;

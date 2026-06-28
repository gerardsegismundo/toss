const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require('xls-to-json-lc');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
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
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    if (['xls', 'xlsx'].indexOf(ext) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');

// @route POST /convert-file
// @desc Convert excel to json
router.post('/convert-file', (req, res) => {
  let exceltojson;
  upload(req, res, (err) => {
    if (err) return res.send(err);

    if (!req.file) return res.json({ err_desc: 'No file passed' });
    const ext = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    if (ext === 'xlsx') exceltojson = xlsxtojson;
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
        fs.unlink(req.file.path, (err) => {
          if (err) console.log(err);
        });
      }
    );
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
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
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + ext);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    if (['xls', 'xlsx'].indexOf(ext) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');

// @route POST /convert-file
// @desc Convert excel to json
router.post('/convert-file', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.send(err);
    if (!req.file) return res.json({ err_desc: 'No file passed' });

    try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '', header: ['usecase', 'utterance', 'intent', 'entity'] });

      res.send(jsonData);

      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
      });
    } catch (parseErr) {
      res.json({ err_desc: parseErr.message });
    }
  });
});

module.exports = router;
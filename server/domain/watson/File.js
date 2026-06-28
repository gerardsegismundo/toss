const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  tags: {
    title: { type: String },
    imageURL: { type: String },
    link: { type: String },
    text: { type: String }
  },
  intent: {
    type: String,
    required: true
  }
});

const File = mongoose.model('file', fileSchema);

module.exports = { File };
</write_to_file>
</execute_command>
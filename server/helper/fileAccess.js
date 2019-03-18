const { File } = require('../models/File')

const fileAccess = async (text) => {
	console.log(text)

	const fileData = await File.findOne({
		intent: text
	})

	if (!fileData) return 'Not found.'
	console.log(fileData)
	return fileData
}

exports.fileAccess = fileAccess

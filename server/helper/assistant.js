const watson = require('watson-developer-cloud');

const conversation = new watson.AssistantV1({
	iam_apikey: 'MVYtqsDyzgU8L_tRLq8QBy80SX9jfnLHTUFx1LFFENFA',
	version: '2019-02-21',
	url: 'https://gateway-wdc.watsonplatform.net/assistant/api'
});

const assistantResponse = (request) => {
	conversation.message(
		{
			workspace_id: '8c09e218-8a3d-4e5d-9f3f-4527c6486553',
			input: { text: request }
		},
		(err, response) => {
			if (err) return console.log(err);
			else {
				console.log(response.output.text[0]);
				return response.output.text[0];
			}
		}
	);
};

exports.assistantResponse = assistantResponse;

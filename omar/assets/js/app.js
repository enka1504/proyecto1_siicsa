let input = document.getElementById('input');
let button = document.createElement('button');

let text = input.value;

const url = 'https://openai80.p.rapidapi.com/chat/completions';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'fb9042b4b7msh1a17af5cf5093d0p145be3jsn027960b6b9af',
		'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
	},
	body: {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My request is “${value}.”`
			}
		]
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
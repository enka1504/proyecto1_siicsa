const promts = [
    {character:'stand', promt:'I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My request is: '},

	{character:'batman', promt:'I want you to act as Batman. I will ask you some topics and you will only answer like him. You should also be sure to incorporate personal anecdotes or experiences. My question is: '},

	{character:'ironman', promt:'I want you to act as Iron Man. I will ask you some topics and you will only answer like him. You should also be sure to incorporate personal anecdotes or experiences. My request is: '},

	{character:'console', promt:'I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. My command is: '},

	{character:'coach', promt:'I want you to act as a motivational coach. I will provide you with some information about someone’s goals and challenges, and it will be your job to come up with strategies that can help this person achieve their goals. This could involve providing positive affirmations, giving helpful advice or suggesting activities they can do to reach their end goal. My first request is: '},
];

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get("id");

let pic = document.getElementById("pic");
let name = document.getElementById("name");
let input = document.getElementById('input');
let button = document.getElementById('button');
let response = document.getElementById('response');
let text;

let promtCharacter = '';

for (let i = 0; i < promts.length; i++) {
  if (promts[i].character === `${id}`) {
    promtCharacter = promts[i].promt;
    break;
  }
}

const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'b169bb8d86msh50491f657e545cbp1ad3b3jsn3c8df13d05a9',
		'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
	},
	body: {
		question: `${promtCharacter} ${text}`
	}
};


window.addEventListener('load', () => {
	pic.setAttribute('src', `./assets/images/${id}.png`)
})

button.addEventListener('click', async () => {
    text = input.value;
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
		response.textContent = result.answer;
    } catch (error) {
        console.error(error);
    }
	console.log(`${promtCharacter}${text}`)
})
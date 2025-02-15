import { createServer } from 'https'; // import https
import { readFileSync } from 'fs'; // import fs
import express from 'express'; // import express
import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv'; // import dotenv
dotenv.config(); // use dotenv
import { generateStory } from './gemini.js'; // import generateStory function from gemini.js
 

const client = new HfInference(process.env.APIKEY); // create huggingface client  

const app = express(); // create express app
app.use(express.json()); // use json
const port = 443; // port 443
const options = {
  key: readFileSync('ssl/ssl.key'),
  cert: readFileSync('ssl/ssl.crt')
}; // options for https
const server = createServer(options, app); // create https server
app.use(express.static('public')); // use public folder
server.listen(port, () => {
    console.log(`Server is running on https://localhost`); 
}); // listen on port 443

app.get('/gemini', async (req, res) => {
  const {q} = req.query;
  const story = await generateStory(process.env.GEMINI_API_TOKEN, q);
  res.send(story);
});

app.post('/gemini', async (req, res) => {
  // console.log(req);
  // res.send("ok");
  
  
  const { q } = req.body;
  const story = await generateStory(process.env.GEMINI_API_TOKEN, q);
  res.send(story.replace(/(```|json)/g, ''));
});


app.get('/api', async (req, res) => {

  const {q} = req.query ;

  const chatCompletion = await client.chatCompletion({
    model: "meta-llama/Llama-3.3-70B-Instruct",
    messages: [
      { role: "system", content: "Jesteś pomocnikiem ai, w sprawach elektrycznych, będziesz pomagał przy instalacjach elektrycznych" },
      { role: "user", content: q }
    ],
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 0.7,
  });

  console.log(chatCompletion.choices[0].message);
  
  res.send(chatCompletion.choices[0].message.content);

}); // create api endpoint

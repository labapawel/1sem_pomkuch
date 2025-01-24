import { createServer } from 'https'; // import https
import { readFileSync } from 'fs'; // import fs
import express from 'express'; // import express

const app = express(); // create express app
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
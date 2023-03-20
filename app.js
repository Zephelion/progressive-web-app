import express from 'express';
import { engine } from 'express-handlebars';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', router);


app.listen(port)
// app.get('/', (req, res) => {
//     res.render('index');
// });

// const http = require('http');

// const hostname = '127.0.0.1';

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
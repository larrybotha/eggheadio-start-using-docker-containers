const http = require('http');
const faker = require('faker');

require('dotenv').config();

const handleRequest = (req, res) => {
  res.end('Hello World!');
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('Request receeived. Greeting user!');

    const user = faker.name.findName();

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`Hello <strong>${user}</strong>`);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on localhost:${process.env.PORT}`);
});

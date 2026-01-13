const hostname = "localhost";
const port = 5000;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pateRouter = require("./routes/pateRouter");

const app = express();
// app.use((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>Express</h1>");
// });

// app.all('/pates', (req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   next();
// })

// //Get all
// app.get('/pates', (req, res) => {
//   res.end("Will show all can of pate Ha Long");
// });

// //Add
// app.post('/pates', (req, res) => {
//   res.statusCode = 201;
//   res.end('Insert new pate with name: ' + req.body.name + ' and price: ' + req.body.price);
// });

// //Detail
// app.get('/pates/:id', (req, res) => {
//   res.end('Will show detail pate with id: ' + req.params.id);
// })

// //PUT
// app.put('/pates/:id', (req, res) => {
//   res.write('Updating pate with id: ' + req.params.id + '\n');
//   res.end('Edit with name: ' + req.body.name + ' and price: ' + req.body.price);
// });

//DELETE

app.use(bodyParser.json());
app.use('/pates', pateRouter);
const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

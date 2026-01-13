const express = require('express');
const bodyParser = require('body-parser');
const pate = require('../data/pates');

const pateRouter = express.Router();
pateRouter.use(bodyParser.json());
pateRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
})
.get((req, res) => {
  res.end("Will show all can of pate Ha Long");
})
.post((req, res) => {
  res.statusCode = 201;
  res.end('Insert new pate with name: ' + req.body.name + ' and price: ' + req.body.price);
})

//PARAM
pateRouter.route('/:id')
.get((req, res) => {
  res.end('Will show detail pate with id: ' + req.params.id);
})
.put((req, res) => {
  res.write('Updating pate with id: ' + req.params.id + '\n');
  res.end('Edit with name: ' + req.body.name + ' and price: ' + req.body.price);
})
.delete((req, res) => {
  res.end('Deleting pate with id: ' + req.params.id);
});


module.exports = pateRouter;
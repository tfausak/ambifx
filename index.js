const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.get('/', (request, response) => {
  response.status(501).json(null);
});

const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

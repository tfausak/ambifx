const express = require('express');

const app = express();
app.get('/', (request, response) => {
  response.status(501).json(null);
});

const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

const express = require('express');
const morgan = require('morgan');

const api = express.Router();
api.get('/', (request, response) => {
  response.status(501).json(null);
});

const app = express();
app.use(morgan('combined'));
app.use('/api', api);

const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

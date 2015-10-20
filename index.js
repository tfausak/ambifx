const express = require('express');
const morgan = require('morgan');

const apiV1 = express.Router();
apiV1.get('/', (request, response) => {
  response.status(501).json(null);
});

const api = express.Router();
api.use('/v1', apiV1);

const app = express();
app.use(morgan('combined'));
app.use('/api', api);

const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

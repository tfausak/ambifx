'use strict';

const express = require('express');
const knex = require('knex');
const morgan = require('morgan');

// Database

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgresql://localhost/'
});

// API v1

const apiV1 = express.Router();

apiV1.use((request, response, next) => {
  if (request.accepts('json')) {
    next();
  } else {
    response.status(406).json(null);
  }
});

apiV1.get('/', (request, response) => {
  response.status(501).json(null);
});

apiV1.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json(null);
});

// API

const api = express.Router();
api.use('/v1', apiV1);

// Application

const app = express();
app.use(morgan('combined'));
app.use('/api', api);

// Server

const port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

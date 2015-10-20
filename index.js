'use strict';

const express = require('express');
const knex = require('knex');
const morgan = require('morgan');

// Configuration

const DB_CONFIG = require('./knexfile');
const PORT = process.env.PORT || 8888;

// Database

const db = knex(DB_CONFIG);

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

const server = app.listen(PORT, () => {
  console.log('Listening on port ' + server.address().port + '...');
});

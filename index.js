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

apiV1.get('/recordings', (request, response) => {
  db('recordings')
    .where('deleted_at', null)
    .orderBy('created_at', 'desc')
    .then((recordings) => {
      response.json(recordings);
    });
});

apiV1.get(/\/recordings\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/, (request, response) => {
  db('recordings')
    .where('guid', request.params[0])
    .then((recordings) => {
      if (recordings.length !== 1) {
        return response.status(404).json(null);
      }
      const recording = recordings[0];
      if (recording.deleted_at) {
        return response.status(410).json(null);
      }
      response.json(recording);
    });
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

'use strict';

const express = require('express');
const knex = require('knex');
const morgan = require('morgan');
const rawBody = require('raw-body');
const uuid = require('uuid');

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

apiV1.post('/recordings',
  (request, _response, next) => {
    rawBody(request, {
      length: request.headers['Content-Length'],
      limit: '10mb'
    }, (error, data) => {
      if (error) {
        return next(error);
      }
      request.rawBody = data;
      next();
    });
  },
  (request, response) => {
    const guid = uuid.v4();
    db('recordings')
      .insert({
        guid: guid,
        latitude: request.query.latitude,
        longitude: request.query.longitude
      })
      .then(() => {
        console.log(arguments);
        response.status(201).location(guid).json(null);
      })
      .catch((_error) => {
        response.status(400).json(null);
      });
  }
);

apiV1.get(/\/recordings\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/, (request, response) => {
  db('recordings')
    .where('guid', request.params[0])
    .where('deleted_at', null)
    .then((recordings) => {
      if (recordings.length !== 1) {
        return response.status(404).json(null);
      }
      response.json(recordings[0]);
    });
});

apiV1.delete(/\/recordings\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/, (request, response) => {
  db('recordings')
    .where('guid', request.params[0])
    .where('deleted_at', null)
    .update('deleted_at', new Date())
    .then((count) => {
      if (count !== 1) {
        return response.status(422).json(null);
      }
      response.status(204).json(null);
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

'use strict';

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgresql://localhost/'
};

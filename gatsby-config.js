'use strict';

/**
 * Run TypeScript code without compiling it
 * Source-map-support mimics node's stack trace making debugging easier
 * ts-node register helps compiling and importing TypeScript modules
 */
require('source-map-support').install();
require('ts-node').register();
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = require('./gatsby-config.ts');

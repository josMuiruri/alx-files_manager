const express = require('express');

/**
 * Adds middlewares to the given express application.
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

module.exports = injectMiddlewares;

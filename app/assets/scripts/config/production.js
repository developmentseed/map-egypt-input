'use strict';
var logo = require('./logo');
/*
 * App config for production.
 */
module.exports = {
  environment: 'production',
  auth0_token: process.env.AUTH0_TOKEN,
  auth0_namespace: process.env.AUTH0_NAMESPACE,
  api_root: process.env.API_ROOT,
  consoleMessage: logo
};


import express, { NextFunction, Response, Request } from 'express';
import { request } from 'http';
const httpProxy = require('express-http-proxy');

const app = express();

const PORT = 4000;
const HOST = 'localhost';

function selectProxyHost(req) {
  if (req.path.startsWith('/api'))
      return 'http://localhost:5000/';
  else if (req.path.startsWith('/webhooks'))
      return 'http://localhost:3000/';
}

app.use((req, res, next) => {
  httpProxy(selectProxyHost(req))(req, res, next);
});


// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

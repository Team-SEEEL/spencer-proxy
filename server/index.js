const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors');
var proxy = require('express-http-proxy');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));

const port = 4000;

app.use(cors());

app.use('/proxy', proxy('www.google.com'));

app.use('/api/main-product', createProxyMiddleware({ target: `http://localhost:3000`, changeOrigin: true }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
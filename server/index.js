const express = require('express');
const axios = require('axios');
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));

const port = 4000;

app.use(cors());

app.use('/products', createProxyMiddleware({ target: `http://localhost:3000`, changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: `http://localhost:3002`, changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: `http://localhost:3003`, changeOrigin: true }));
app.use('/reviews', createProxyMiddleware({ target: `http://localhost:3004`, changeOrigin: true }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



const express = require('express');
const server = express();

server.use(express.json());

server.post('/slash/', (req, res) => {
  console.log(req.body);
  const response = {
    text: 'Hello',
  };
  res.json(response);
});

server.listen(process.env.PORT || 3000, () =>
  console.log('🚀 listening on :3000')
);

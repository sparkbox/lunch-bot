const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const config = require('./pg-config');
const server = express();

server.use(
  bodyParser.urlencoded({
    extended: false,
    type: 'application/x-www-form-urlencoded',
  })
);

const save = (name, id) => {
  const postgres = new Client(config);
  postgres.connect();
  const statement =
    'insert into helpers values ($1, $2) on conflict (slackid) do update set name=$1';
  const values = [name, id];

  postgres.query(statement, values, (err, res) => {
    console.log('log: ', err ? err.stack : res);
    postgres.end();
  });
};

server.post('/slash/', (req, res) => {
  if (req.body.token === process.env.slackSlashToken) {
    const [register, name] = req.body.text.split(' ');

    if (register === 'register') {
      if (name) {
        const response = {
          text: `I'll add you (${name}) to the list of helpers. Thanks 🙇`,
        };
        res.json(response);
        save(name, req.body.user_id);
      } else {
        const response = {
          text:
            "✋ Tell me the name you'll use to signup for lunch duties in the spreadsheet. \nFor example: `/lunch register Adam`",
        };
        res.json(response);
      }
    }
  }

  res.status(500).end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`🚀 listening on ${port}`));

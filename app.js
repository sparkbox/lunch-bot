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
    console.log('save log: ', err ? err.stack : res);
    postgres.end();
  });
};

const fetchName = id =>
  new Promise((resolve, reject) => {
    const postgres = new Client(config);
    postgres.connect();
    const statement = 'select name from helpers where slackid=$1';
    const values = [id];

    postgres.query(statement, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const result = res.rows.length ? res.rows[0].name : undefined;
        resolve(result);
      }
      postgres.end();
    });
  });

server.post('/slash/', (req, res) => {
  if (req.body.token === process.env.slackSlashToken) {
    const [subcmd, ...params] = req.body.text.split(' ');

    if (subcmd === 'register') {
      if (params.length > 0) {
        const name = params[0];
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
    } else if (subcmd === 'whoami') {
      const result = fetchName(req.body.user_id).then(name => {
        const response = {
          text: name
            ? `You are: 🆔 \`${name}\``
            : `Looks like you aren't signed up. Go ahead and register via:\n \`/lunch register NAME\``,
        };
        res.json(response);
      });
    }
  } else {
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`🚀 listening on ${port}`));

import googleAPI from 'google-sheets-api';
/* eslint no-unused-vars: "off" */
import Promise from 'polyfill-promise';
const { Client } = require('pg');

const config = require('../pg-config');

const Sheets = googleAPI.Sheets;
const id = process.env.sheetID;
const serviceEmail = process.env.serviceEmail;
const serviceKey = process.env.sheetPem;

const getLunch = () => {
  const sheet = new Sheets({ email: serviceEmail, key: serviceKey });

  return sheet.getSheets(id).then(info => {
    const cells = sheet.getCells(id, info[0].id);

    return cells;
  });
};

const getSlackNames = () =>
  new Promise((resolve, reject) => {
    const postgres = new Client(config);
    postgres.connect();
    postgres.query({ text: 'select name,slackid from helpers' }, (err, res) => {
      if (!err) {
        resolve(res.rows);
      } else {
        reject(err);
      }
      postgres.end();
    });
  });

export { getLunch, getSlackNames };

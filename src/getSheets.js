import googleAPI from 'google-sheets-api';
/* eslint no-unused-vars: "off" */
import Promise from 'polyfill-promise';

const Sheets = googleAPI.Sheets;
const id = process.env.sheetID;
const serviceEmail = process.env.serviceEmail;
const serviceKey = process.env.sheetPem;

const getLunch = () => {
  const sheet = new Sheets({ email: serviceEmail, key: serviceKey });

  return sheet.getSheets(id).then((info) => {
    const cells = sheet.getCells(id, info[0].id);

    return cells;
  });
};

const getSlackNames = () => {
  const sheet = new Sheets({ email: serviceEmail, key: serviceKey });

  return sheet.getSheets(id).then((info) => {
    const names = info.filter(x => x.title === 'Slack Names')[0];
    const slackNames = sheet.getCells(id, names.id);

    return slackNames;
  });
};

export { getLunch, getSlackNames };

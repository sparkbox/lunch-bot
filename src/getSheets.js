import googleAPI from "google-sheets-api";
import Promise from "polyfill-promise";

const Sheets = googleAPI.Sheets;
const id = process.env.sheetID;
const serviceEmail = process.env.serviceEmail;
const serviceKey = process.env.sheetPem;

const getLunch = () => {
  const sheet = new Sheets({email: serviceEmail, key: serviceKey});

  return sheet.getSheets(id).then((info) => {
    const cells = sheet.getCells(id, info[0].id);

    return cells;
  });
}

const getSlackNames = () => {
  const sheet = new Sheets({email: serviceEmail, key: serviceKey});

  return sheet.getSheets(id).then((info) => {
    const slackNames = sheet.getCells(id, info[2].id);

    return slackNames;
  });
}

export { getLunch, getSlackNames };

import Promise from 'polyfill-promise';
import { getLunch, getSlackNames } from './getSheets';
import { getNextLunch, getDateColumn } from './getNextLunchDate';
import { parseNames } from './parseNames';
import { postToSlack } from './postToSlack';
import { returnSlackNames } from './returnSlackNames';

let namesObj = {};

const formatSlackNames = (names) => names.map((x) => ` <@${x}>`);

const parseData = (data) => {
  const dates = getDateColumn(data);
  const next = getNextLunch(dates);
  const names = parseNames(data, next);
  const slackNames = returnSlackNames(names, namesObj);
  const formattedNames = formatSlackNames(slackNames).toString();
/* eslint max-len: "off" */
  const msg = `
    <!subteam^${process.env.groupID}|dayton> ${formattedNames} are scheduled to help with lunch on Friday.

    ${process.env.sheetUrl}
  `;

  postToSlack('#general', msg);
};

const getData = () => {
  const namesAndData = [getLunch(), getSlackNames()];

  Promise.all(namesAndData).then((x) => {
    namesObj = x[1];
    parseData(x[0]);
  });
};

const date = new Date();
// thursday
if (date.getDay() === 4) {
  getData();
}

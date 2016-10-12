import Promise from 'polyfill-promise';
import { getLunch, getSlackNames } from './getSheets';
import { getNextLunch, getDateColumn } from './getNextLunchDate';
import { formatForGeneral } from './parseNames';
import { postToSlack } from './postToSlack';

let namesObj = {};

const formatSlackNames = (names) => names.map((x) => ` <@${x}>`);

const parseData = (data) => {
  const dates = getDateColumn(data);
  const next = getNextLunch(dates);
  const names = formatForGeneral(data, next, namesObj);
/* eslint max-len: "off" */
  const msg = `
    <!subteam^${process.env.groupID}|dayton> The following people are scheduled to help with lunch on Friday:
    ${names}

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

import Promise from 'polyfill-promise';
import Slack from 'slack-client';
import { getLunch, getSlackNames } from './getSheets';
import { getNextLunch, getDateColumn } from './getNextLunchDate';
import { formatForGeneral } from './parseNames';
import { postToSlack } from './postToSlack';

let namesObj = {};

const returnSlackID = () => {
  return new Promise((resolve, reject) => {
    const slack = new Slack.WebClient(process.env.slackToken);

    slack.users.list({}, (err, response) => {
      if (err) reject(err);
      const obj = {};

      response.members.forEach((x) => {
        obj[`${x.name}`] = x.id;
      });

      resolve(obj);
    });
  });
};

const parseData = (slackIds, data) => {
  const dates = getDateColumn(data);
  const next = getNextLunch(dates);
  const names = formatForGeneral(slackIds, data, next, namesObj);
  /* eslint max-len: "off" */
  const msg = `
    <!subteam^${process.env.groupID}|dayton> The following people are scheduled to help with lunch on Friday:
    ${names}

    ${process.env.sheetUrl}
  `;

  postToSlack('#-general', msg);
};

const getData = () => {
  returnSlackID().then((slackIds) => {
    const namesAndData = [getLunch(), getSlackNames()];

    Promise.all(namesAndData).then((x) => {
      namesObj = x[1];
      parseData(slackIds, x[0]);
    });
  });
};

const date = new Date();
// thursday
if (date.getDay() === 4) {
  getData();
}

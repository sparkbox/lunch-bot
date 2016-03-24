import Promise from "polyfill-promise";
import { getLunch, getSlackNames } from "./getSheets";
import { getNextLunch, getDateColumn } from "./getNextLunchDate";
import { parseNames } from "./parseNames";
import { postToSlack } from "./postToSlack";
import { returnSlackNames } from "./returnSlackNames";

let namesObj = {};
const getData = () => {
    const namesAndData = [getLunch(), getSlackNames()];

    Promise.all(namesAndData).then((x) => {
      namesObj = x[1];
      parseData(x[0]);
    });
}

const parseData = (data) => {
  const dates = getDateColumn(data);
  const next = getNextLunch(dates);
  const today = new Date();
  //1000 * 3600 * 24 is milliseconds in 1 day
  const dayInMilliseconds = 1000 * 3600 * 24;
  if ((next - today) / (dayInMilliseconds) < 7) {
    const names = parseNames(data, next);
    const slackNames = returnSlackNames(names, namesObj);
    const msg = `
      You are scheduled to help with lunch on Friday with ${names}.\n If you are unable to do so please find a replacement and update the spreadsheet.

      ${process.env.sheetUrl}
    `;

    slackNames.forEach((helper) => {
      postToSlack(`@${helper}`, msg);
    });
  }
};

const date = new Date();
//wednesday
if (date.getDay() === 3) {
  getData();
}

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
  const names = parseNames(data, next);
  const slackNames = returnSlackNames(names, namesObj);
  const formattedNames = formatSlackNames(slackNames).toString();
  const msg = `
    @dayton ${formattedNames} are scheduled to help with lunch on Friday.
    
    ${process.env.sheetUrl}
  `;

  postToSlack('#general', msg);
};

const formatSlackNames = (names) => {
  const formattedNames = names.map((x) => {
    return ` <@${x}>`;
  });

  return formattedNames;
}

const date = new Date();
//thursday
if (date.getDay() === 4) {
  getData();
}

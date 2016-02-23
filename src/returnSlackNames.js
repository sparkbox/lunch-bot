import _ from "lodash";

const returnSlackNames = (names, slackNamesMap) => {
  const slackNames = slackNamesMap.map((x, i) => {
    if (_.includes(names, x.content)) {
      return slackNamesMap[i+1].content;
    }
  }).filter((x) => {
    return !_.isUndefined(x);
  });

  return slackNames;
}

export { returnSlackNames };

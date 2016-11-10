import _ from 'lodash';

const returnSlackNames = (slackIds, names, slackNamesMap) => {
  const slackNames = slackNamesMap.map((x, i) => {
    if (_.includes(names, x.content)) {
      const name = slackNamesMap[i + 1].content;

      if (slackIds) {
        const id = slackIds[`${name}`];
        return `${id}|${name}`;
      }

      return name;
    }
    return false;
  }).filter(x => x);

  return slackNames;
};

export { returnSlackNames };

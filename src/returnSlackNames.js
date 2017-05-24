const returnSlackNames = (name, slackNamesMap) => {
  return slackNamesMap.map((x, i) => {
    let matched;
    if (typeof name === 'object') {
      matched = name.filter(z => z.trim() === x.content);
    } else {
      matched = name.trim() === x.content ? name.trim() : [];
    }
    if (matched.length) {
      return slackNamesMap[i + 1].content;
    }
    return false;
  }).filter((x) => x);

  return slackNames;
};

export { returnSlackNames };

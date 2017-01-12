const returnSlackNames = (name, slackNamesMap) => {
  return slackNamesMap.map((x, i) => {
    if (name.trim() === x.content) {
      return slackNamesMap[i + 1].content;
    }
    return null;
  }).filter(x => x);
};

export { returnSlackNames };

const returnSlackNames = (names, slackNamesMap) => {
  const slackNames = slackNamesMap.map((x, i) => {
    if (names.trim() === x.content) {
      return slackNamesMap[i + 1].content;
    }
    return false;
  }).filter((x) => x);

  return slackNames;
};

export { returnSlackNames };

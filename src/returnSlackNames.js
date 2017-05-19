const returnSlackNames = (name, slackNamesMap) => {
  return slackNamesMap.map((x, i) => {
    const matched = name.filter(z => z.trim() === x.content);
    if (matched.length) {
      return slackNamesMap[i + 1].content;
    }
    return false;
  }).filter((x) => x);

  return slackNames;
};

export { returnSlackNames };

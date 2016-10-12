import _ from 'lodash';

const parseNames = (data, nextDateRow) => {
  const names = data.filter((x) => x.row === nextDateRow.row)
  .map((x) => {
    if (_.includes(['D', 'E', 'F', 'G'], x.column)) {
      return x.content;
    }
    return false;
  }).filter((name) => name)
  .map((x) => x.split(','));

  const trimmedNames = _.flatten(names).map((x) => x.trim());

  return trimmedNames;
};

export { parseNames };

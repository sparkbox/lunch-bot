import _ from "lodash";

const parseNames = (data, nextDateRow) => {
  const names = data.filter((x) => {
    return (x.row === nextDateRow.row);
  }).map((x) => {
    if (_.includes(['D', 'E', 'F', 'G'], x.column)) {
      return x.content;
    }
  }).filter((name) => {
    if(!_.isUndefined(name)) {
      return name;
    }
  }).map((x) => {
    return x.split(',');
  });

  const trimmedNames = _.flatten(names).map((x) => {
    return x.trim();
  });;

  return trimmedNames
};

export { parseNames };

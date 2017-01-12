import _ from 'lodash';
import { returnSlackNames } from './returnSlackNames';

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

const roleForLetter = (letter) => {
  const roles = {
    D: 'Primary Prep',
    E: 'Prep Helpers',
    F: 'Primary Cleaner',
    G: 'Cleaning Helpers',
  };
  return roles[`${letter}`];
};

const groupRoleAndNames = (data, nextDateRow) => {
  const roleAndName = {};

  data.filter((x) => x.row === nextDateRow.row)
  .forEach((x) => {
    if (_.includes(['D', 'E', 'F', 'G'], x.column)) {
      const role = roleForLetter(x.column);
      roleAndName[`${role}`] = x.content;
    }
  });

  return roleAndName;
};

const formatForPrivate = (data, nextDateRow) => {
  let formattedNames = '';
  const roleAndName = groupRoleAndNames(data, nextDateRow);

  _.each(roleAndName, (e, i) => {
    formattedNames += `
    *${i}*
    ${e}
    `;
  });

  return formattedNames;
};

const formatForGeneral = (slackIds, data, nextDateRow, namesObj) => {
  let formattedNames = '';
  const roleAndName = groupRoleAndNames(data, nextDateRow);

  _.each(roleAndName, (e, i) => {
    let names = '';

    e.split(',').forEach((x, z, array) => {
      const slack = returnSlackNames(slackIds, x, namesObj);
      if (slack.length > 0) {
        if (z === array.length - 1) {
          names += `<@${slack[0]}>`;
        } else {
          names += `<@${slack[0]}>, `;
        }
      }
    });

    formattedNames += `
  *${i}*
  ${names}
    `;
  });

  return formattedNames;
};

export { parseNames, formatForPrivate, formatForGeneral };

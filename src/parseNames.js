import _ from 'lodash';
import Slack from 'slack-client';

const getUsers = () =>
  new Promise((resolve, reject) => {
    const slack = new Slack.WebClient(process.env.slackToken);
    slack.users.list({}, (err, x) => {
      const y = x.members.filter(user => !user.deleted).map(z => {
        return {
          id: z.id,
          name: z.real_name,
          firstName: z.profile.first_name,
          shortName: z.name,
        };
      });

      resolve(y);
    });
  });

const parseNames = (data, nextDateRow) => {
  const names = data
    .filter(x => x.row === nextDateRow.row)
    .map(x => {
      if (_.includes(['D', 'E', 'F', 'G'], x.column)) {
        return x.content;
      }
      return false;
    })
    .filter(name => name)
    .map(x => x.split(','));

  const trimmedNames = _.flatten(names).map(x => x.trim());

  return trimmedNames;
};

const roleForLetter = letter => {
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

  data.filter(x => x.row === nextDateRow.row).forEach(x => {
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

const formatForGeneral = (data, nextDateRow, namesObj, slackInfo) => {
  let noMatch = [];
  let formattedNames = '';
  const roleAndName = groupRoleAndNames(data, nextDateRow);

  _.each(roleAndName, (e, i) => {
    let names = '';

    e.split(',').forEach((x, z, array) => {
      const slack = namesObj
        .filter(name => {
          return name.name === x;
        })
        .map(obj => obj.slackid);
      if (slack.length > 0) {
        names += z === array.length - 1 ? `<@${slack[0]}>` : `<@${slack[0]}>, `;
      } else {
        noMatch.push(x);
        names += `<@${x}>`;
      }
    });

    formattedNames += `
  *${i}*
  ${names}
    `;
  });

  if (noMatch.length > 0) {
    formattedNames += `\n${noMatch.join(
      ', '
    )} need to update their name with lunch-bot via \`/lunch register\``;
  }

  return formattedNames;
};

export { getUsers, parseNames, formatForPrivate, formatForGeneral };

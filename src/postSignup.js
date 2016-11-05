import { postToSlack } from './postToSlack';

const post = () => {
/* eslint max-len: "off" */
  const msg = `
    <!subteam^${process.env.groupID}|dayton> Friday lunch guest signup.
    Bring yo wives…bring yo kids…

    ${process.env.guestSignup}
  `;

  postToSlack('#general', msg);
};

const date = new Date();
// wednesday
if (date.getDay() === 3) {
  post();
}

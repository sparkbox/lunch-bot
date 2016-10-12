import Slack from 'slack-client';

const postToSlack = (channel, msg) => {
  const slack = new Slack.WebClient(process.env.slackToken);

  slack.chat.postMessage(channel, msg, {
    unfurl_links: true,
    as_user: true,
  });
};

export { postToSlack };

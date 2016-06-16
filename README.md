# lunch-bot

![lunch-bot-icon](http://files-misc.s3.amazonaws.com/lunchbot.jpg)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is a Slack bot that parses the Sparkbox lunch Google Sheet and reminds us who is on duty for the upcoming Friday lunch.

To run the app there are several `ENV` variables that you need to set:

### `sheetUrl`
URL to the Google Sheet you'll be using with your team. Here's a [sample Sheet] you can copy to start your own.

### `sheetID`
ID of the Google Sheet you want to parse. In our [sample Sheet], the ID is `1fZXtKnxwcxP4GWGMRFtGun1VOnDYuiAgAR_yWlgEx_o`.

### `slackToken`
The Slack bot token you received when installing and configuring the `lunch-bot` in [Slack Bots]

### `groupID`
_Optional_: The [ID of the Slack group][slack-group] to alert.

### `serviceEmail` and `sheetPem`
This is an email and public key you generate for `lunch-bot` to use in reading via the [Google Sheets API]. To generate your `serviceEmail`:

1. Create a project in [Google Developer Console], for example: "Sheets App".
2. Enable Drive API for project under _APIs & auth > APIs_.
3. Create service auth credentials for project under _APIs & auth > Credentials > Create new Client ID: Service account_.
4. Collect the listed service email address.
5. Regenerate and download the P12 key.
6. Convert the .p12 file into .pem format:.
```
openssl pkcs12 -in *.p12 -nodes -nocerts > sheets.pem
```
_NOTE: when prompted for password, it's `notasecret`_

Finally, share the Sheets document to service email address using the Share button on your sheet.

Thanks to the [google-sheets-api] npm module for providing the instructions for `serviceEmail` and `sheetPem`.

[sample Sheet]: https://docs.google.com/spreadsheets/d/1fZXtKnxwcxP4GWGMRFtGun1VOnDYuiAgAR_yWlgEx_o/edit#gid=1318762544
[Google Sheets API]: https://developers.google.com/google-apps/spreadsheets/
[Slack Bots]: https://slack.com/apps/A0F7YS25R-bots
[Google Developer Console]: https://console.developers.google.com/project
[google-sheets-api]: https://www.npmjs.com/package/google-sheets-api#usage
[slack-group]: https://api.slack.com/docs/formatting#linking_to_urls

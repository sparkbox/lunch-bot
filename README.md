# lunch-bot

This is a Slack bot that parses the Sparkbox lunch Google Sheet and reminds us who is on duty for the upcoming Friday lunch.

To run the app there are several `ENV` variables that you need to set:

- `serviceEmail`: the Google Sheets API email that you added to your document
- `sheetID`: the ID of the Google Sheet you want to parse
- `sheetPem`: the `pem` key file for the Google Sheet API
- `sheetUrl`: the URL to the Google Sheet
- `slackToken`: the Slack bot token

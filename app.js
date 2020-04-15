const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

app.shortcut('file_bug', async ({ shortcut, ack, context, client }) => {
  try {
    await ack();

    await client.views.open({
      token: context.botToken,
      trigger_id: shortcut.trigger_id,
      view: {
        type: "modal",
        callback_id: "submit-bug",
        title: {
          type: "plain_text",
          text: "File a issue"
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true
        },
        close: {
          type: "plain_text",
          text: "Close"
        },
        blocks: [
          {
            type: "input",
            label: {
              type: "plain_text",
              text: "Describe your issue",
              emoji: true
            },
            element: {
              type: "plain_text_input",
              multiline: true
            }
          },
          {
            type: "input",
            label: {
              type: "plain_text",
              text: "What type of issue is this?",
              emoji: true
            },
            element: {
              type: "radio_buttons",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "bug",
                    emoji: true
                  },
                  value: "1"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "enhancement",
                    emoji: true
                  },
                  value: "2"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "question",
                    emoji: true
                  },
                  value: "3"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "documentation related",
                    emoji: true
                  },
                  value: "4"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "discussion",
                    emoji: true
                  },
                  value: "5"
                }
              ]
            }
          },
          {
            type: "input",
            label: {
              type: "plain_text",
              text: "Describe reproduction steps",
              emoji: true
            },
            element: {
              type: "plain_text_input",
              multiline: true
            },
            optional: true
          }
        ]
      }
    })
  } catch(err) {
    console.error(err);
  }
})

app.view('submit-bug', async ({ ack, body, view, context }) => {
  await ack();
  console.log(view);
});

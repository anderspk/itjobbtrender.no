const functions = require("firebase-functions");

const { finn } = require("./services/scrapers");

exports.scheduledFunction = functions.pubsub
  .schedule("every 1 day")
  .onRun(async (context) => {
    await finn();
    return null;
  });

// exports.isolatedFunction = functions.https.onRequest(finn);

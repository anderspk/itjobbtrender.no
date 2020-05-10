const functions = require("firebase-functions");

const { finn } = require("./services/scrapers");

exports.scheduledFunction = functions.pubsub
  // .schedule("0 10 * * *")
  // .timeZone("Europe/Oslo")
  .schedule("every 15 minutes")
  .onRun(async (context) => {
    await finn();
    console.log("Scheduled Function Complete");
  });

// exports.isolatedFunction = functions.https.onRequest(finn);

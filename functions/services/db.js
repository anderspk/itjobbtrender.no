const admin = require("firebase-admin");
const serviceAccount = require("../admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const addKeyword = async (keyword, count) => {
  const keywordRef = admin.firestore().collection("keywords").doc(keyword);
  const keywordDoc = await keywordRef.get();

  try {
    if (keywordDoc.exists) {
      await keywordRef
        .collection("history")
        .add({
          count,
          date: admin.firestore.FieldValue.serverTimestamp(),
        })
        .catch(() => new Error("Error updating keyword"));
    } else {
      await admin
        .firestore()
        .collection("keywords")
        .doc(keyword)
        .collection("history")
        .add({
          count,
          date: admin.firestore.FieldValue.serverTimestamp(),
        })
        .catch(() => new Error("Error adding new keyword"));
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addKeyword,
};

const admin = require("firebase-admin");
try {
  const serviceAccount = require("../admin.json");
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (error) {
  admin.initializeApp();
}

const db = admin.firestore();
const batch = db.batch();

const saveKeywords = async (keywords) => {
  keywords.forEach((count, keyword) => {
    const docRef = db.collection("keywords").doc(keyword);
    batch.set(docRef, {});
  });
  await batch.commit();
  keywords.forEach(async (count, keyword) => {
    const keywordRef = db.collection("keywords").doc(keyword);
    try {
      await keywordRef
        .collection("history")
        .add({
          count,
          date: admin.firestore.FieldValue.serverTimestamp(),
        })
        .catch(() => new Error("Error updating keyword"));
    } catch (error) {
      console.error(error);
    }
  });
};

const saveKeyword = async (keyword, count) => {
  const keywordRef = db.collection("keywords").doc(keyword);
  const keywordSnapshot = await keywordRef.get();

  try {
    if (keywordSnapshot.exists) {
      await keywordRef
        .collection("history")
        .add({
          count,
          date: admin.firestore.FieldValue.serverTimestamp(),
        })
        .catch(() => new Error("Error updating keyword"));
    } else {
      await db.collection("keywords").doc(keyword).set({});
      await db
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

const saveDailySummary = async (adCount) => {
  try {
    const dailySummaryRef = db.collection("dailySummary");
    await dailySummaryRef
      .add({
        date: admin.firestore.FieldValue.serverTimestamp(),
        totalDayAdCount: adCount,
      })
      .catch(() => new Error("Error adding daily summary"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  saveKeywords,
  saveDailySummary,
};

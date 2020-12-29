import { db } from "../services/firebase";

export const getAllKeywords = async () => {
  try {
    const keywordsRef = db.collection("keywords");
    const KeywordsDoc = await keywordsRef.get();
    return KeywordsDoc.docs.map((keywordDoc) => keywordDoc.id);
  } catch (error) {
    console.error(error);
  }
};

export const getKeyword = async (keyword) => {
  const keywordHistorySnapshot = await db
    .collection("keywords")
    .doc(keyword)
    .collection("history")
    .orderBy("date")
    .get();
  return keywordHistorySnapshot.docs.map((doc) => doc.data());
};

export const getMultipleKeywords = async (keywords) => {
  const allKeyData = await Promise.all(
    keywords.map((keyword) => getKeyword(keyword))
  );

  const keyDataObject = {};
  keywords.forEach((key, i) => (keyDataObject[key] = allKeyData[i]));

  return keyDataObject;
};

export const getdailySummaries = async () => {
  const dailySummaries = await db
    .collection("dailySummaries")
    .orderBy("date")
    .get();
  return dailySummaries.docs.map((dailySummary) => dailySummary.data());
};

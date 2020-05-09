import { db } from "../services/firebase";

export const getAllKeywords = async () => {
  console.log("called");
  try {
    const keywordsRef = db.collection("keywords");
    const KeywordsDoc = await keywordsRef.get();
    return KeywordsDoc.docs.map((keywordDoc) => keywordDoc.id);
  } catch (error) {
    console.error(error);
  }
};

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJCwsCC5e3llj1lz8QMIgBXhAx89Dsaqs",
  authDomain: "itjobbtrender.firebaseapp.com",
  databaseURL: "https://itjobbtrender.firebaseio.com",
  projectId: "itjobbtrender",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

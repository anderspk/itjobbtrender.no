import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJCwsCC5e3llj1lz8QMIgBXhAx89Dsaqs",
  authDomain: "itjobbtrender.firebaseapp.com",
  databaseURL: "https://itjobbtrender.firebaseio.com",
  projectId: "itjobbtrender",
  appId: "1:391767560521:web:cb65c633702c5b35234a98",
  measurementId: "G-2RTN4MR7T2",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();

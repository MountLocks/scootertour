import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/performance";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyB7if_PA8k3FtV3KMtYdPkHbWiozu51lko",
  authDomain: "mount-scootertour.firebaseapp.com",
  projectId: "mount-scootertour",
  storageBucket: "mount-scootertour.appspot.com",
  messagingSenderId: "836401170506",
  appId: "1:836401170506:web:61dcbc3306fb40224b7eb3",
  measurementId: "G-GC5JDDZ8T3"
};

const app = firebase.initializeApp(config);
const db = firebase.firestore();
firebase.performance();
firebase.analytics();

const arrayUnion = array => firebase.firestore.FieldValue.arrayUnion(array);

export default app;
export { db, arrayUnion };

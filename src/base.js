import Rebase from "re-base";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCfcgHXAsJM_zM-p2yMKt4AupGhW1RhyQs",
  authDomain: "catch-of-the-day-b8227.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-b8227.firebaseio.com",
  projectId: "catch-of-the-day-b8227",
  storageBucket: "catch-of-the-day-b8227.appspot.com",
  messagingSenderId: "290874604382"
};
const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

//this is a default export
export default base;

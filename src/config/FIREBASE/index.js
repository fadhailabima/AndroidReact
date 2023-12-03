import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAliUbUNdUuzkK7gdooXDB9FtZFJL08V2s",
  authDomain: "tubes-10-pbp.firebaseapp.com",
  databaseURL: "https://tubes-10-pbp-default-rtdb.firebaseio.com",
  projectId: "tubes-10-pbp",
  storageBucket: "tubes-10-pbp.appspot.com",
  messagingSenderId: "100814405573",
  appId: "1:100814405573:web:1e421e91cdef9d02b815ac",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const realtime = firebase.database();

export default firebase;
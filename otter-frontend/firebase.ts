/* The code is importing functions and objects from the Firebase SDK for web. */
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl0_ssx78CeebvSmtUEimfuZcIe590OmI",
  authDomain: "otter-5a39f.firebaseapp.com",
  projectId: "otter-5a39f",
  storageBucket: "otter-5a39f.appspot.com",
  messagingSenderId: "755945168927",
  appId: "1:755945168927:web:4eee57127b2df76340352a"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
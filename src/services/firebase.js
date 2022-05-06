// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Context from "../Context/Context";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSN5B3JCDCYcacfmL29ox4SUxc1HpgKg",
  authDomain: "custom-9aad1.firebaseapp.com",
  projectId: "custom-9aad1",
  storageBucket: "custom-9aad1.appspot.com",
  messagingSenderId: "288280541056",
  appId: "1:288280541056:web:cfb54a4b509fe818caf365",
  measurementId: "G-1YQQM6JN22",
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export default firebase;
export { auth, db, analytics, storage };

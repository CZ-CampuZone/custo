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
  apiKey: "AIzaSyCXXVS2lUu6hXW0AXaeJelACy7CD8jZPRU",
  authDomain: "layatex-bc78f.firebaseapp.com",
  projectId: "layatex-bc78f",
  storageBucket: "layatex-bc78f.appspot.com",
  messagingSenderId: "772693300879",
  appId: "1:772693300879:web:f260180f270e2bbcb502fa",
  measurementId: "G-JGXMHD742R"
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export default firebase;
export { auth, db, analytics, storage };

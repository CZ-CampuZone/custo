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
// const firebaseConfig = {
//   apiKey: "AIzaSyCXXVS2lUu6hXW0AXaeJelACy7CD8jZPRU",
//   authDomain: "layatex-bc78f.firebaseapp.com",
//   projectId: "layatex-bc78f",
//   storageBucket: "layatex-bc78f.appspot.com",
//   messagingSenderId: "772693300879",
//   appId: "1:772693300879:web:f260180f270e2bbcb502fa",
//   measurementId: "G-JGXMHD742R"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDP4kewU6kt94bBFoZHAfeVUh9DtD0z2PA",
  authDomain: "layatex-b9cbc.firebaseapp.com",
  projectId: "layatex-b9cbc",
  storageBucket: "layatex-b9cbc.appspot.com",
  messagingSenderId: "918256160962",
  appId: "1:918256160962:web:8750d031aa4fc0e142ab5b",
  measurementId: "G-5HQ829NF2Z"
};
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export default firebase;
export { auth, db, analytics, storage };

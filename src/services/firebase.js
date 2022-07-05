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
  apiKey: "AIzaSyDaDKQtnaAs8WHOv9kmGH_5u7hOyMK2Unw",
  authDomain: "testing-361e7.firebaseapp.com",
  projectId: "testing-361e7",
  storageBucket: "testing-361e7.appspot.com",
  messagingSenderId: "757958341695",
  appId: "1:757958341695:web:bdefd47b791d9cb53ab48a",
  measurementId: "G-RC5GYSL876"
};
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export default firebase;
export { auth, db, analytics, storage };

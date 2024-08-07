import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcJj_IDyPYBYQXuuYWaTKpL_76O2wWrUs",
  authDomain: "edc-ideas.firebaseapp.com",
  projectId: "edc-ideas",
  storageBucket: "edc-ideas.appspot.com",
  messagingSenderId: "374640334970",
  appId: "1:374640334970:web:524b776f1f98b7f3e8c3c3",
};

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { provider, auth, db };

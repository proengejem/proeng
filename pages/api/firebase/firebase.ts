import { initializeApp,  getApps, getApp} from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeb5LVnz2y3BEcaqeKsIv8gMXfaYXzFG0",
  authDomain: "proeng-1c603.firebaseapp.com",
  projectId: "proeng-1c603",
  storageBucket: "proeng-1c603.firebasestorage.app",
  messagingSenderId: "478268149688",
  appId: "1:478268149688:web:f4e971cbdb0baf1e5a494d",
  measurementId: "G-Y5GJKN3V0L"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bucket = getStorage(app);

// const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

// export { auth, googleProvider, bucket, db };

export {bucket}
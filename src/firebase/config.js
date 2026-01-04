import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// YOUR Firebase configuration (from Step 4)
const firebaseConfig = {
  apiKey: "AIzaSyCMT2IsM5Puft1ymokyP1-mt0UhsoxpDz8",
  authDomain: "trendcart-3c4ee.firebaseapp.com",
  projectId: "trendcart-3c4ee",
  storageBucket: "trendcart-3c4ee.firebasestorage.app",
  messagingSenderId: "454131361688",
  appId: "1:454131361688:web:0aff362fd553138ebb2ded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
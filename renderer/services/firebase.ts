import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPw8PKLuK6Wt5n130MQ0YqcvsbLyoNSak",
  authDomain: "chat-app-ccae0.firebaseapp.com",
  projectId: "chat-app-ccae0",
  storageBucket: "chat-app-ccae0.appspot.com",
  messagingSenderId: "523422922409",
  appId: "1:523422922409:web:0bb6e1c45266441a169bb8",
  measurementId: "G-G4GS9J5BS6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };

// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

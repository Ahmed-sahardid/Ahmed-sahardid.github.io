
// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getAuth }       from 'firebase/auth'
import { getAnalytics }  from 'firebase/analytics'

// Paste your Firebase config here:
const firebaseConfig = {
  apiKey: "AIzaSyBpq0xaPeyVJjBSlu43x1UPmzhU_TQyq5E",
  authDomain: "brightphotobooth-83194.firebaseapp.com",
  projectId: "brightphotobooth-83194",
  storageBucket: "brightphotobooth-83194.firebasestorage.app",
  messagingSenderId: "1093725774211",
  appId: "1:1093725774211:web:b8ec17d96ac8d3248196b6",
  measurementId: "G-E40XKNJNH2"
};

// Initialize core services
const app       = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// (optional) analytics
try {
  getAnalytics(app)
} catch(e) {
  // Analytics will only run in production on https
  console.warn('Analytics not initialized', e)
}

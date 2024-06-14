import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDh2CFK1BleUHpJA2e2sD28SR1uxhKLw_k",
  authDomain: "asr-digitals-store.firebaseapp.com",
  databaseURL: "https://asr-digitals-store-default-rtdb.firebaseio.com",
  projectId: "asr-digitals-store",
  storageBucket: "asr-digitals-store.appspot.com",
  messagingSenderId: "643856999023",
  appId: "1:643856999023:web:4aad2431cabbe43deb639a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {app,database};
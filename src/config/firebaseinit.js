// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHPhBlQacCDAHtYlXKywKAGlmavKDkC-c",
  authDomain: "photoinstamaxsemarang.firebaseapp.com",
  projectId: "photoinstamaxsemarang",
  storageBucket: "photoinstamaxsemarang.appspot.com",
  messagingSenderId: "56649103180",
  appId: "1:56649103180:web:7e3cff13b5dc37d4dd41e9",
  measurementId: "G-4BK749S4VD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORE = getStorage(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TUTORIAL: MIN. 50 https://www.youtube.com/results?search_query=firebase+in+react+js
import firebase from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "key",
    authDomain: "move-me-webapp.firebaseapp.com",
    projectId: "move-me-webapp",
    storageBucket: "move-me-webapp.appspot.com",
    messagingSenderId: "1087452600725",
    appId: "id",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore= getFirestore(app);
export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TUTORIAL: MIN. 50 https://www.youtube.com/results?search_query=firebase+in+react+js


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXKcBEUQ-Ey9rqaRon8VQiyjdV5YawZDQ",
    authDomain: "move-me-webapp.firebaseapp.com",
    projectId: "move-me-webapp",
    storageBucket: "move-me-webapp.appspot.com",
    messagingSenderId: "1087452600725",
    appId: "1:1087452600725:web:09b64ad9da5aa8c5397e9c",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore= getFirestore(app);

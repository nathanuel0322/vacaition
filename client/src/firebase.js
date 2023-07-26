import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, collection,addDoc } from "firebase/firestore";
import {ref, getStorage, uploadBytes, } from "firebase/storage";

// Optionally import the services that you want to use

//import {...} from "firebase/database";
//import {...} from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnixLg0POOOz_WXDzbiykLkk7jqIgVP1w",
  authDomain: "vacaition-8be20.firebaseapp.com",
  projectId: "vacaition-8be20",
  storageBucket: "vacaition-8be20.appspot.com",
  messagingSenderId: "1041543405263",
  appId: "1:1041543405263:web:f08401cda60cef92e4a1ba"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(Firebase);

export const db = getFirestore(Firebase);
// getDoc(doc(firestore, "Businesses", "BizData"))
// // .then is genuinely the most essential thing here as it threw me off for hours
//   .then(result => Globals.businesses=result.data());

// export default Firebase;
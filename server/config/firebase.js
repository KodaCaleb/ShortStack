// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const { getFirestore } = require('firebase/firestore')
const { getStorage } = require ('@firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzccZA5jJkQ1Nkb6FUSACZCrNZT_onP-s",
  authDomain: "project3-15aff.firebaseapp.com",
  projectId: "project3-15aff",
  storageBucket: "project3-15aff.appspot.com",
  messagingSenderId: "588692894211",
  appId: "1:588692894211:web:4f13c32a12d5e1b0c61436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore and get a reference to the service
const firestore =  getFirestore(app) ;

module.exports = firestore

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Storage and get a reference to the service
export const auth = getAuth(app);

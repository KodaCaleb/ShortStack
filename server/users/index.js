const { firebase } = require("../config/firebase");
const { collection, getFirestore, getDocs, where,  doc, query } = require("@firebase/firestore");
const firestore = getFirestore(firebase);

// Create a reference to the Users collection
const users = collection( firestore,'Users');

// Define the specific user ID
const userId = '1AgshjHIigujTKEXtVQR';

// Create a reference to the Users document
const userDocRef = doc(users, userId);

// Define the name of the nested subcollection you want to access
const nestedCollectionName = 'userInfo';

// Create a reference to the nested subcollection using the Users document reference
const nestedCollectionRef = collection(userDocRef, nestedCollectionName);

// Create a reference to the ID of the targeted document
const subDocId = 'account';

// Create a reference to the specific element being targeted
const inputField = 'email'

// Get the data for a single subdocument
getDocs(nestedCollectionRef)
.then((querySnapshot) => {
    // Loops through the data and returns all available subdocuments
    querySnapshot.forEach((doc) => {
        // Matches the specific subdocument wanted
        if (doc.id === subDocId) {
            // Targets the specific key/value data for front end use
            console.log(subDocId, '=>', doc.data()[inputField]);
        };
    });
})
.catch((error) => {
    console.log("error getting document: ", error);
})

// extra functions for possible use later..

// Get the data for a single user by ID 
// getDocs(nestedCollectionRef)
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//             });
//     })
//     .catch((error) => {
//         console.log("error getting document: ", error);
//     })
        
// Get data for all users
// getDocs(users)
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("error getting documents: ", error);
//     });
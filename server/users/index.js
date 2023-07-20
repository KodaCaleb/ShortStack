const { firebase } = require("../config/firebase");
const { collection, getFirestore, getDocs, where,  doc, query } = require("@firebase/firestore");

const firestore = getFirestore(firebase);

// Create a reference to the Users collection
const users = collection( firestore,'Users');

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

// Define the specific user ID
const userId = '1AgshjHIigujTKEXtVQR';

// Create a reference to the Users document
const userDocRef = doc(users, userId);

// Define the name of the nested subcollection you want to access
const nestedCollectionName = 'userInfo';

// Create a reference to the nested subcollection using the Users document reference
const nestedCollectionRef = collection(userDocRef, nestedCollectionName);

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

// Create a reference to the ID of the targeted document
const subDocId = 'profile';

// // Get the data for a specific subcollection document
getDocs(nestedCollectionRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id === subDocId) {
                console.log(subDocId, '=>', doc.data());
            };
        });
    })
    .catch((error) => {
        console.log("error getting document: ", error);
    })

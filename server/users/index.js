const { firebase } = require("../config/firebase");
const { collection, getFirestore, getDocs, doc } = require("@firebase/firestore");

const firestore = getFirestore(firebase);

// Create a reference to the Users collection
const users = collection( firestore,'Users');

// Get function for all users
getDocs(users)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((error) => {
        console.log("error getting documents: ", error);
    });

// Create a reference to the specific user ID
const userId = '1AgshjHIigujTKEXtVQR';

// Get a reference to the Users document
const userDocRef = doc(users, userId);

// Define the name of the nested subcollection you want to access
const nestedCollectionName = 'userInfo';

// Create a reference to the nested subcollection using the Users document reference
const nestedCollectionRef = collection(userDocRef, nestedCollectionName);

// Get function for retrieving a user and nested info by ID
getDocs(nestedCollectionRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            });
    })
    .catch((error) => {
        console.log("error getting document: ", error)
    })

// Create a reference to the ID of the targeted document
const subCollectionDocId = 'profile';

// Create a reference to the specific document within the nested subcollection
const subCollectionDocRef = doc(nestedCollectionRef, subCollectionDocId);

// Get function for a users profile info

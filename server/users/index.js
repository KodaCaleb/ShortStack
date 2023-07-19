const {firebase} = require ("../config/firebase")
const  {collection, getFirestore, getDocs, doc}  = require ("@firebase/firestore")

const firestore = getFirestore(firebase)
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

const userDocRef = doc(users, '1AgshjHIigujTKEXtVQR')
const nestedCollectionRef = collection(userDocRef, 'userInfo')

// Get function for a user by ID
getDocs(nestedCollectionRef)
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        });
})
.catch((error) => {
    console.log("error getting document: ", error)
})

const {firebase} = require ("../config/firebase")
const  {collection, getFirestore}  = require ("@firebase/firestore")

const firestore = getFirestore(firebase)
const users = collection( firestore,'Users');

const querySnapshot = users.get();

querySnapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });


// if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     console.log('Document data:', doc.data());
//   }

const {firebase} = require ("../config/firebase")
const  {collection, getFirestore, getDocs, doc}  = require ("@firebase/firestore")

const firestore = getFirestore(firebase)
const users = collection( firestore,'Users');

const userDocRef = doc(users, '1AgshjHIigujTKEXtVQR')
const nestedCollectionRef = collection(userDocRef, 'userInfo')


getDocs(nestedCollectionRef)
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
})
.catch((error) => {
    console.log("error getting document: ", error)
})




// if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     console.log('Document data:', doc.data());
//   }

import { Link } from 'react-router-dom';
import { firestore } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const ProfileLink = async (userId) => {
    const docRef = doc(firestore, "Users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
    console.log("Document data:", docSnap.data());
    } else {
    docSnap.data() //will be undefined in this case
    console.log("No such document!");
    }


    return (<div>

    </div>
        // <Link to={`/profiles`} className="inline-block">
        //     {/* <img
        //         className=" rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 bg-yellow-500"
        //         // src={photoURL}
        //         // alt={`Profile of User ${userData}`}
        //     /> */}
        // </Link>
    );
};

export default ProfileLink;
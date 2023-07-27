import { Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase"

const ProfileLink = async () => {
    // const docRef = doc(firestore, "Users", userId);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
    // } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    // }


    return (
        <Link to={`/profiles`} className="inline-block">
            <img
                // src={userData.PhotoURL}
                // alt={`Profile of ${displayName}`}
                className="rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 bg-yellow-500 cursor-pointer rounded-full h-16 w-16 object-cover border border-gray-400 hover:border-gray-600"
            />
        </Link>
    );
};

export default ProfileLink;
// import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";



// export const actionCodeSettings = {
//     url: 'https://project3-15aff.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
//     handleCodeInApp: true,
//     dynamicLinkdomain: 'project3-15aff.firebaseapp.com'
// };

// const auth = getAuth();
// sendSignInLinkToEmail(auth, email, actionCodeSettings)
//   .then(() => {
//     alert("Sign-up link successfully sent to your email!")
//     //saves email locally 
//     window.localStorage.setItem('emailForSignIn', email);
//     // window.location.href = "/email";
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

//   if(isSignInWithEmailLink(auth, window.location.href)) {
//     let email = window.localStorage.getItem('emailForSignIn');
//     if (!email){
//         email = window.prompt('Please provide your email confirmation!');
//     }
//     signInWithEmailLink(auth, email, window.location.href)
//         .then((result) => {
//             window.localStorage.removeItem('emailForSignIn');
//         });
//   }

// ForgotPassword.js
import React, { useState } from "react";
import {getAuth, sendPasswordResetEmail } from "firebase/auth"



const ForgotPassword = ({ email }) => {
//   const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
        const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setMessage("Error sending password reset email. Please try again.");
      console.error(error);
    }
  };
  return (
    <div>
      
      {/* <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <button onClick={handleResetPassword}>Forgot Password</button>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;

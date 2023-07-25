// ForgotPassword.js
import React, { useState, useEffect } from "react";
import {getAuth, sendPasswordResetEmail } from "firebase/auth"

const ForgotPassword = ({ email }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
        const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setMessage("Error sending password reset email. Please try again.");
      console.log(error);
    } finally {
        setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (message) {
    window.alert(message);
        setMessage("");
    }
  }, [message]);

  return (
    <div>
      <button onClick={(e)=>{handleResetPassword(e)}}>Forgot Password</button>
      {/* {message && window.alert(message)} */}
    </div>
  );
}

export default ForgotPassword;

// ForgotPassword.js
import React, { useState } from "react";
import {getAuth, sendPasswordResetEmail } from "firebase/auth"

const ForgotPassword = ({ email }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResetPassword = async () => {
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
  return (
    <div>
      <button onClick={handleResetPassword}>Forgot Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;

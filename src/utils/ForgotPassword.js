// ForgotPassword.js
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ email }) => {
  //State variables to manage the message and processing state
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  //Function to handle the password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
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

  //window alert when it changes
  useEffect(() => {
    if (message) {
      window.alert(message);
      setMessage("");
    }
  }, [message]);

  return (
    <div>
      <div
        type="button"
        onClick={(e) => {
          handleResetPassword(e);
        }}
      >
        Forgot Password
      </div>
      {/* {message && window.alert(message)} */}
    </div>
  );
};

export default ForgotPassword;

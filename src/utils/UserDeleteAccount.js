import { useState, useContext } from "react";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext"

export function UserDeleteAccount() {
  // Initializing the navigate function from the 'react-router-dom' library
  const navigate = useNavigate();

  // Accessing isLoggedIn state from the AuthContext using useContext hook
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Function to delete user and log them out
  const handleDeleteAccount = async () => {
    try {
      if (isLoggedIn) {
        // Display a confirmation dialog to warn the user
        const confirmed = window.confirm(
          "Are you sure you want to delete your account? This action is irreversible and all your information will be deleted."
        );

        if (confirmed) {
          const auth = getAuth();
          const user = auth.currentUser;

          // Extension automatically deletes the associated data based on the configured paths.
          await deleteUser(user);

          // Logout the user after successful account deletion
          logout();

          // Redirect to the homepage after successful account deletion
          navigate("/");
        } else {
          // If the user clicks Cancel, the account deletion process will be canceled
          window.alert("Account deletion canceled.");
        }
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      // Handle any errors that occurred during the deletion process
    }
  };
// Return the function
  return handleDeleteAccount;
}

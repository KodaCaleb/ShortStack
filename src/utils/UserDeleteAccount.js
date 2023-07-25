import { useState } from "react";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      // Display a confirmation dialog to warn the user
      const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action is irreversible and all your information will be deleted."
      );

      if (confirmed) {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Extension automatically deletes the associated data based on the configured paths.
          await deleteUser(user);

          // Redirect to the homepage after successful account deletion
          navigate("/");
        }
      } else {
        // If the user clicks Cancel, the account deletion process will be canceled
        console.log("Account deletion canceled.");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      // Handle any errors that occurred during the deletion process
    }
  };

  return handleDeleteAccount;
}

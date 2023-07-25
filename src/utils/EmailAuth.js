import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    handleCodeInApp: true,
    dynamicLinkdomain: 'example.page.link'
};

const auth = getAuth();
sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    alert("Sign-up link successfully sent to your email!")
    //saves email locally 
    window.localStorage.setItem('emailForSignIn', email);
    // window.location.href = "/email";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
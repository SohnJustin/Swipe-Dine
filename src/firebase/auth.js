import { auth } from "./firebase";
import {
  createUserWithPhoneNumber,
  signInWithPhoneNumber,
  signInAnonymously,
  RecaptchaVerifier
} from "firebase/auth";

export const doSignInAnonymously = async (auth) => {
  return signInAnonymously(auth);
};
export const doSignUpWithPhone = async () => {
  return createUserWithPhoneNumber(auth, phone);
};

export const doSignInWithPhone = async (phone) => {
  return signInWithPhoneNumber(auth, phone);
};

export const doSignOut = async () => {
  return auth.signOut();
};
// Function to set up the reCAPTCHA verifier
export const setUpRecaptcha = (auth) => {
  // Ensure reCAPTCHA rendering element is available
  if (!document.getElementById('recaptcha-container')) {
    const recaptcha = document.createElement('div');
    recaptcha.id = 'recaptcha-container';
    document.body.appendChild(recaptcha);
  }

  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible', // or 'normal' for visible CAPTCHA
    callback: (response) => {
      // reCAPTCHA solved - can proceed with phone authentication
    }
  }, auth);
};


// Later on in the project, we will add more functions to this file
// Such as...
// adding more different methods of logging in, that will be done here.

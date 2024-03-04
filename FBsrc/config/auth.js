import auth from '@react-native-firebase/auth';

// Sign in function
function signIn(email, password) {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User signed in!');
    })
    .catch(error => {
      console.error(error);
    });
}

import firebase from "firebase";

// download from firebase site
const firebaseConfig = {
  
};

// initialize the firebase database
const firebaseApp = firebase.initializeApp(firebaseConfig);

// realtime data base in firestore
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

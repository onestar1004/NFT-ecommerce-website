import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCyCDfPk63ZJ532Ujv0u4keXhS2cowJia0",
  authDomain: "flipkartgridnft.firebaseapp.com",
  projectId: "flipkartgridnft",
  storageBucket: "flipkartgridnft.appspot.com",
  messagingSenderId: "801103590174",
  appId: "1:801103590174:web:5e8717b10038c509a0cf0f",
  measurementId: "G-80L9P24L55"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const analytics = firebase.analytics();
export { db, auth, storage, analytics };

// gs://flipkartgridnft.appspot.com/

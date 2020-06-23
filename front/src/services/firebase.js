import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN2x_mPyuFfBwonVehssfutEAjeSjrENA",
  authDomain: "hwc-personal.firebaseapp.com",
  databaseURL: "https://hwc-personal.firebaseio.com",
  projectId: "hwc-personal",
  storageBucket: "hwc-personal.appspot.com",
  messagingSenderId: "754666527140",
  appId: "1:754666527140:web:b5a4a586a3b8e77e91c931",
  measurementId: "G-VVD359X1J7"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
//export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};

export const signInWithEmailAndPassword = (email, pass) => {
  return auth.signInWithEmailAndPassword(email, pass);
}

export const createUserWithEmailAndPassword = (email, pass) => {
  return auth.createUserWithEmailAndPassword(email, pass);
}

export const signOut = (email, pass) => {
  return auth.signOut();
}
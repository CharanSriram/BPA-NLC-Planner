import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAsb46D81aKL0RUKPLIU4puiT58-X7JMf0",
    authDomain: "bpawebsitedesign-35190.firebaseapp.com",
    projectId: "bpawebsitedesign-35190",
    storageBucket: "bpawebsitedesign-35190.appspot.com",
    messagingSenderId: "800051201985",
    appId: "1:800051201985:web:189904b03bacde37c89140",
    measurementId: "G-376NB3FD6V"
};

firebase.initializeApp(firebaseConfig)

export let db = firebase.firestore();
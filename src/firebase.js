import firebase from 'firebase/app';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDMBarL1YiCbZYfBtQobcqFu9O-oUF2UM0",
    authDomain: "rmmp-7187d.firebaseapp.com",
    databaseURL: "https://rmmp-7187d.firebaseio.com",
    projectId: "rmmp-7187d",
    storageBucket: "rmmp-7187d.appspot.com",
    messagingSenderId: "842036112095",
    appId: "1:842036112095:web:c4fd61f26e40bdbb9b176a",
    measurementId: "G-VHJWZ7RLYM"
};
// Initialize Firebase

let firebaseCache;

export const getFirebase = () => {
    if (firebaseCache) {
        return firebaseCache;
    }

    firebase.initializeApp(firebaseConfig);
    firebaseCache = firebase;
    return firebase;
};


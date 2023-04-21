import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ-uNlF0Q-TqysjuEZeufDFXD9tQTt6R0",
    authDomain: "electronic-ecomm-db.firebaseapp.com",
    projectId: "electronic-ecomm-db",
    storageBucket: "electronic-ecomm-db.appspot.com",
    messagingSenderId: "153166691123",
    appId: "1:153166691123:web:1a366e773c6869e1a1dc46"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});


export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

// Firestore - Database
export const db = getFirestore();

export const createUserDocFromAuth = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);
   
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (e) {
            console.log("Error creating the User: ", e.message);
        }
    }

    return userDocRef;
}
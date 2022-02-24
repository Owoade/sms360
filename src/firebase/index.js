import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: process.env.REACT_FIREBASE_API_KEY,
//     authDomain:process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyBAJjkSqcg_dyZ8E4W9v7De_vba6r6Fwbg",
    authDomain: "sms360-8e9b3.firebaseapp.com",
    projectId: "sms360-8e9b3",
    storageBucket: "sms360-8e9b3.appspot.com",
    messagingSenderId: "932901977888",
    appId: "1:932901977888:web:3a35fb03d0f68c11eca145"
};
const app = initializeApp(firebaseConfig);
const  db = getFirestore(app);
const auth=getAuth(app);
export {db,auth}

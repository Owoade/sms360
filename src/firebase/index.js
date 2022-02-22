import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
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
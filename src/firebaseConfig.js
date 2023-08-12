import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs} from 'firebase/firestore';
import {getStorage} from "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyC4yaSqcxTqxP2QVQY0U1BwX0mB_L_LfOE",
    authDomain: "homelancer-39741.firebaseapp.com",
    projectId: "homelancer-39741",
    storageBucket: "homelancer-39741.appspot.com",
    messagingSenderId: "597607319360",
    appId: "1:597607319360:web:9f700d63e31650c302dca5"
  };
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);




// getToken(messaging, {vapidKey: "BHPMrppibWSOrmGKBZ4AGHKEEAnYL85-2hlfmgZ3vEyx3XkzRZL4gnN991I1Mm45Y00AZJsPgXPCqCTvwHrSy7w"});

// const  {REACT_APP_VAPID_KEY} = "AAAAiyQsB0A:APA91bFb62RW6CVra58wvORdke7FRF7DrR3pYNn4qoTCkImP-e7GVFtHzjEnpxxR7VqaKT81JUrLDZFqz83MUzvEHwnZPrGx95AL5GmBjzcI7F-L3NjPQ8zEtb5Oakrz8UdaB8kzDyJJ";
// const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//   let currentToken = '';
  
//   try{
//     currentToken = await messaging.getToken({PvapidKey: publicKey});
//     if(currentToken){
//       setTokenFound(true);
//     }
//     else{
//       setTokenFound(false);
//     }

//   } catch (error) {
//     console.error("An error occurred while receiving token", error);
//   }

//   return currentToken;
// }

// export const onMessage = () => 
//   new Promise((resolve) => {
//     messaging.onMessage((payload)=>{
//       resolve(payload);
//     })
// });




export  {db, app, storage, getDocs};
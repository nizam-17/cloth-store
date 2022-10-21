import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc}from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7igy9KVss27QENHEB3CpehyJi1MoL9vI",
    authDomain: "cloth-store-db-b9344.firebaseapp.com",
    projectId: "cloth-store-db-b9344",
    storageBucket: "cloth-store-db-b9344.appspot.com",
    messagingSenderId: "680608585393",
    appId: "1:680608585393:web:d6d95d16b48d757bfd7490"
  };
  
  // Initialize Firebase
  const FirebaseApp = initializeApp(firebaseConfig);

  const provider= new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  })
  export const auth=getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

  export const db=getFirestore()
  export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapShot=await getDoc(userDocRef);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
      const {displayName,email}=userAuth;
      const createdAt=new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          createdAt,
          email
        });}
        catch(error){
          console.log('error creating the user',error.message)
        }
      }
      return userDocRef;
    }; 
  
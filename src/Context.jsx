import { auth, db} from "./confg";
import {GoogleAuthProvider,signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail} from "firebase/auth"
import {getFirestore,query,collection, where,addDoc, getDoc, getDocs} from "firebase/firestore"
import {useNavigate} from "react-router-dom"
import React, {useContext} from "react"



const AuthContext = React.createContext()
 
 export const AuthProvider = ({children}) => {
    const googleLogin = async() => {
    
    try {
        const provider = new GoogleAuthProvider()
         const response = await signInWithPopup(auth, provider)
        const user = response.user
          console.log(user)
        const userRef = (collection(db, "users"))

        const querySnapshot = await getDocs(userRef);
        if(querySnapshot.docs.length > 0) {
          await addDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          })
        }
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });

    } catch (error) {
        throw new Error(error)
    }
    
}

  const loginEmailAndPassword = async (email, password) => {
    try {
       const response = await signInWithEmailAndPassword(auth, email, password)
       console.log(response)
    } catch (error) {
        throw new Error(error)
    }
    
}

 const registerWithEmailAndPassword = async (name, email, password) => {
    try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    console.log(response.user)
    const user = response.user
    console.log(user)
    const userRef = collection(db, "users")
    console.log(userRef)
    const querySnapshot = query(userRef, where("name", "==", name))
    const doc = await getDocs(querySnapshot)
    // const querySnapshot = await getDocs(userRef)
    if(doc.docs.length == 0) {
        await addDoc(userRef, {
        uid: user.uid,
        name: name,
        email: user.email,
      })
    } 
   doc.forEach((doc) => {
    console.log(doc.id, "=>", doc.data())
   })
    } catch (error) {
        throw new Error (error)
    }
    
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
        return <AuthContext.Provider value={{
            googleLogin,
            loginEmailAndPassword,
            registerWithEmailAndPassword,
            sendPasswordReset
            }}>
           {children}
        </AuthContext.Provider>
 }

export const useGlobalContext = () => {
    return useContext(AuthContext)
}


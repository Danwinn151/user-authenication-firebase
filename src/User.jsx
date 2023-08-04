import React, { useEffect, useState } from 'react'
import {auth, db} from "./confg"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import { collection, query, where, getDoc, getDocs } from 'firebase/firestore'
const User = () => {
  const [loading, setLoading] = useState("")
  const [userInfo, setUserInfo] = useState([])
  const[username, setUsername] = useState("")
  const[userEmail, setUseremail] = useState("")

  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    
     const fetchSpecificUser = async () => {
      const userRef = collection(db, "users")
      const querySnapshot = query (userRef, where("email", "==", user?.email))
      const doc = await getDocs(querySnapshot)
      const {name, email} = (doc?.docs[0]?.data())
      setUsername(name)
      setUseremail(email)
    }

    if(!user) {
      navigate("/")
    }

      fetchSpecificUser()

      let intervalId
      if(!username){
        intervalId = setTimeout(() => {
           fetchSpecificUser()
        },5000)
      }
  },[user, username, loading, setLoading])

  const handleSignOut = async() => {
    await signOut(auth)
    navigate("/")
  }
  
  console.log(username)



  return (
    <div className='flex flex-col justify-center items-center border border-[#e2e0e0] mx-10 mt-10 lg:mx-[250px] py-10'>
    <div className='flex flex-row justify-center items-center gap-6'>
     <p>Logged in as <span className='text-blue-500 font-bold'>{username ? username : "loading"}</span></p> 
     
     {user?.photoURL ? 
      <img className='rounded-[100%]' src={user?.photoURL} alt='image'/>
       : ""
     }
     
    </div>

    <button className='bg-blue-500 rounded-md px-3 py-2' onClick={handleSignOut}>
      Sign Out
    </button>
    </div>
  )
  
}

export default User
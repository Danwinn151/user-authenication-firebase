import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "./Context"
import {useNavigate} from "react-router-dom"
import { useAuthState } from "react-admin"
import { auth } from "./confg"
export default function Register() {

  const navigate = useNavigate()

   const { registerWithEmailAndPassword } = useGlobalContext()

   const [user] = useAuthState(auth)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const registerAccount = (e) => {
    e.preventDefault()
    try {
       if(!name | !email | !password) {
        setError("Kindly Fill in all details")
        return;
    }
       registerWithEmailAndPassword(name, email, password)
       
    } catch (error) {
      setError("There is error logging in")
      throw new Error (error)
    }
   
  }

  useEffect(() => {
    let TimeoutId
    if(error) {
      TimeoutId = setTimeout(() => { 
        setError("")
    },1000)
    }
    if(!user){
      navigate("/")
    }
    return () => {
      clearTimeout(TimeoutId)
    }

  },[error, user])

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <span className="text-red-300">{error}</span>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                 Name
                </label>
                <div className="mt-2">
                  <input
                    name="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                   
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                   
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                   
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={registerAccount}
                >
                  Register
                </button>
              </div>

              <div className="text-sm flex flex-row gap-5">
                 <p>Already have an account? </p>
                    <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Login
                    </Link>
                  </div>
            </form>
          </div>
        </div>
      </>
    )
  }
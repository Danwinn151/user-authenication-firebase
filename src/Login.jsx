import React, {useState, useEffect} from "react"
import { auth, db} from "./confg";
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {FaGoogle} from "react-icons/fa"
import { useGlobalContext } from "./Context"
import {useAuthState} from "react-firebase-hooks/auth"

export default function Login() {
  const {googleLogin, loginEmailAndPassword} = useGlobalContext()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

   const Login = async (e) => {
    e.preventDefault()   
    try {
      
      if(!email && !password) {
        setError("Fill in all details")
      }
      await loginEmailAndPassword(email, password)
    } catch (error) {
         setError("There is error logging in")
        throw new Error (error)
    }
   }

   const handlerGoogleLogin = async (e) => {
       e.preventDefault()
       try {
        const response =  await googleLogin()
        console.log(response)
        navigate("/user")
       }
       catch (error) {
        throw new Error(error)
       }
    
   }
   

   useEffect(() => {
    let TimeoutId
    if(error) {
      TimeoutId = setTimeout(() => { 
        setError("")
    },2000)
    }
    if(user) {
      navigate("/user")
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
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
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
                    <Link to="/reset" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                   onClick={Login}
                  className="flex w-full justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <button
                  type="submit"
                  onClick={handlerGoogleLogin}
                  className="flex w-full justify-center items-center gap-5 rounded-md bg-[#FFF] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in with google
                 <span className="text-blue-600"><FaGoogle/></span> 
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to={"/Register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
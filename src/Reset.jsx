import { useState, useEffect } from "react";
import { auth} from "./confg";
import { useGlobalContext } from "./Context";
import {useNavigate, Link} from "react-router-dom"
import {useAuthState} from "react-firebase-hooks/auth"

export default function Reset() {

const {sendPasswordReset} = useGlobalContext()

  const [email, setEmail] = useState("");
  const[error, setError] = useState("");

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault()   
    try {
      
      if(!email && !password) {
        setError("Fill in the detail")
      }
      await sendPasswordReset(email)
      alert("Password reset link sent!, check your email");
      navigate('/')
      
    } catch (error) {
         setError("There is error resetting your password")
        throw new Error (error)
    }
}
  useEffect(() => {

    if (user) navigate("/dashboard");

  }, [user]);
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <span className="text-red-300">{error}</span>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your account
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
                <button
                  type="submit"
                   onClick={handleReset}
                  className="flex w-full justify-center rounded-md mb-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Reset
                </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to={"/Register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Here
              </Link>
            </p>
          </div>
        </div>

  )
}
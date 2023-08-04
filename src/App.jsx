import {Route, Routes} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import User from "./User"
import  Reset  from "./Reset"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route  path="/Register" element={<Register/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
    </>
  )
}

export default App

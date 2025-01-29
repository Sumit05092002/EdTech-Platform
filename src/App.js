import "./App.css";
import Home from "./pages/Home";
import { Routes,Route } from "react-router-dom";
import Navbar from './components/common/Navbar'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword"
import EmailOTP from "./pages/EmailOTP"
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/signUp" element={<SignUp></SignUp>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
      <Route path="/email-verification" element={<EmailOTP></EmailOTP>}></Route>
    </Routes>
   </div>
  );
}

export default App;

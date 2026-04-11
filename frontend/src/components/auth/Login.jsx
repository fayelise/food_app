import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { MdAlternateEmail } from "react-icons/md";
import Message from "../ui/Message";
import { FaFingerprint,FaRegEye,  FaRegEyeSlash} from "react-icons/fa6";
import { API_URL } from "../../api";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({message:"", type:""});
  const navigate = useNavigate();
  const {setUser, setToken} = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const HandleLogin = async() => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      setUser(data.user || {id: data.id, email: data.email}); 
      setMessage({message: "Login successful", type:"success"});
      setTimeout(() => {
        navigate("/dashboard");}, 2000);
    } else {
      setMessage({message: data.error, type:"error"});
    }
    
  } catch (error) {
    console.error("Error:", error);
    setMessage({message: "An error occurred. Please try again.", type:"error"});
  }
}

  
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-lg p-5 bg-white flex-col flex items-center gap-3 rounded-xl 
      shadow-slate-500 shadow-lg">
      <Link to="/"><img src={logo} alt="food" className="w-20 md:w-28" /></Link>
      <h1 className="text-lg md:text-2xl font-semibold text-gray-700">Welcome Back</h1>
      {message.message && (<Message message={message.message} type={message.type} clearMessage={() => setMessage({ message: "", type: "" })}/>)}
      <p className="text-md md:text-lg text-center text-gray-700">Dont have an account? <Link to="/register" className="text-blue-500">Sign Up</Link></p>
      <div className="w-full  flex flex-col gap-3">
        <div className="w-full flex items-center bg-white border-[#FF1212] border p-3 rounded-xl gap-2 shadow-lg">
          <MdAlternateEmail className="w-5 h-5 text-gray-500" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-0 text-sm md:text-base outline-none" />
        </div>

        <div className="w-full flex items-center bg-white border border-[#FF1212] p-3 rounded-xl gap-2 shadow-lg relative">
          <FaFingerprint className="w-5 h-5 text-gray-500" />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-0 text-sm md:text-base outline-none" />
          {showPassword ? <FaRegEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />: 
          <FaRegEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />}
        </div>

      </div>

      <button className="w-full bg-[#FF1212] text-white rounded-xl mt-3 py-3 hover:shadow-lg text-sm md:text-base" onClick={HandleLogin}>Login</button>

      </div>
    </div>
  )
}

export default Login

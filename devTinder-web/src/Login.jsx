import {useState} from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addUser } from './utils/userSlice';

const Login=()=>{
   const [email,setEmail] =useState("");
   const [password,setPassword] =useState("");
   const [error,setError]=useState("");

   const dispatch=useDispatch();
   const navigate = useNavigate();

    const handleLogin =async()=>{
      try{
         const res=await axios.post("http://localhost:1511/login",{
          email,password
         },{withCredentials:true});
       dispatch(addUser(res.data));
      return navigate('/feed');
      }catch(err){
        setError(err?.response?.data||"something went wrong")
        console.log(err);
      }
    };

    return(
       <div className="flex justify-center items-center h-screen">

     <div className="card card-border bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 w-96">   
  <div className="card-body flex  justify-center">
  <h3 className="text-black text-center">Sign In</h3>
     {/* passwword */}
    <label className="input mb-4 mt-4 ml-1.5">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email" placeholder="mail@site.com"  value={email} 
  onChange={(e)=>setEmail(e.target.value)}
  required />
</label>
    {/* mail */}
       
       <label className="input mb-4 ml-1.5">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    placeholder="Password" value={password}
    onChange={(e)=>setPassword(e.target.value)}
    required
  />
</label>
    <p className="text-red-500">Error: {error}</p>
    <div className="card-actions flex justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>

       </div>
    );
};

export default Login;
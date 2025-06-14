import Navbar from './Navbar';
import Profile from './Profile';
import Login from './Login';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './utils/appStore';
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "./utils/userSlice"; 
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useEffect } from "react";
import Feed from "./Feed.jsx";

function Layout() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const userData=useSelector((store)=>store.user);

  const fetchUser=async()=>{
  if(userData) return;
   try{
     const user=await axios.get("http://localhost:1511/profile",{withCredentials:true});
     dispatch(addUser(user.data));
   }catch(err){
    if(err.status===401){
      navigate('/login');
    }
    console.error(err);
   }
  };

  useEffect(()=>{
    fetchUser();
  },[]);
    
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
    path: '/login',
    element: <Login />, 
  },
  {
    path: '/profile',
    element: <Profile />, 
  },
  {
    path:'/feed',
    element:<Feed/>,
  },
 ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}
export default App;
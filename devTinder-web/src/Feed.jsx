import axios from "axios";
import {useDispatch, useSelector } from "react-redux";
import {addFeed} from "./utils/feedSlice";
import { useEffect } from "react";
import Usercard from "./Usercard";


const Feed =()=>{
    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();

    const getFeed=async(req,res)=>{
        if (feed) return;
       try{
        await axios.get("http://localhost:1511/feed", { withCredentials: true });
        dispatch(addFeed(res.data.feed));
       }catch(err){
         res.send("error" + err.message);
       }
    };
    useEffect(()=>{
        getFeed();
    },[]);

    return (
       (feed&&
        <div className="flex justify-center my-10">
         <Usercard user={feed[0]} />
       </div>
       )
    );
};

export default Feed;
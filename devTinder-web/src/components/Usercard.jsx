import axios from "axios";
import {useDispatch} from "react-redux";
import {addFeed,removeUserFromFeed} from "../utils/feedSlice";
const Usercard=({user})=>{
    const dispatch=useDispatch();
    const {_id,firstName,lastName,photoURL,age,gender,about,skills}=user;
   const handleSendRequest=async(status,userId)=>{
    try{
       const res=await axios.post(process.env.BASE_URL+"/send/"+ status +"/"+userId,{},{withCredentials:true});
       dispatch(removeUserFromFeed(userId));
    }catch(err){
      console.log(err);
    }
   }
  
    return (
        <div className="card bg-base-300 w-96 shadow-lg">
          <div className="card-body p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={photoURL} 
                    alt="User_img" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className="card-title text-center mb-2">{firstName+" "+lastName}</h2>
              {age&&gender&&<p className="text-sm text-gray-600 mb-2">{age +" "+gender}</p>}
            </div>
            <p className="text-center mb-6">{about}</p>
            <div className="card-actions justify-center gap-4">
              <button 
                className="btn btn-primary btn-sm" 
                onClick={()=>handleSendRequest("ignore",_id)}
              >
                Ignore
              </button>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={()=>handleSendRequest("interested",_id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
    );
};

export default Usercard;
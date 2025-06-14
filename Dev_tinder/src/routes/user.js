const express= require("express");
const userRouter = express.Router();
const userAuth = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequests");
const User = require('../models/user');
const USER_INFO="firstName , lastName ,gender,age,skills,about,photoURL";

userRouter.get("/requests/received",userAuth,async(req,res)=>{
    try{
          const loggedInuser=req.user;
          const receivedRequests= await ConnectionRequest.find({toUserId:loggedInuser,status:"interested"}).populate("fromUserId",USER_INFO);
          res.json({message:"follow requests..",receivedRequests});
    }catch(err){
        res.status(400).send("Error :"+err.message);
    }
});

userRouter.get("/connections",userAuth,async(req,res)=>{
   try{
       const loggedInuser=req.user;
       const connections=await ConnectionRequest.find({$or:[{fromUserId:loggedInuser,status:"accepted"},{toUserId:loggedInuser,status:"accepted"}]})
       .populate("fromUserId",USER_INFO).populate("toUserId",USER_INFO);
       const data=connections.map((r)=>{
        if(r.fromUserId._id.toString===loggedInuser._id){
            return r.toUserId;
        }
         return r.fromUserId;
         res.json({connections});
       });
   }catch(err){
    res.status(400).send("Error :"+err.message);
   }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
     try{
          const loggedInuser=req.user;
          // const page=parseInt(req.query.page)||1;
          // const limit=parseInt(req.query.limit)||10;
          // const skip=(page-1)*limit;

          const connectionRequests=await ConnectionRequest.find({$or:[{fromUserId:loggedInuser._id},{toUserId:loggedInuser._id}]})
          .select("fromUserId toUserId ");
          const hideUserFromFeed =new Set();
          connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
          });
          const feed=await User.find({$and:[
            {_id:{$nin:Array.from(hideUserFromFeed)}},{_id:{$ne:loggedInuser._id}}]})
            .select(USER_INFO)
            res.json({ feed });
     }catch(err){
        res.status(400).send("Error :"+err.message);
     }
});
module.exports=userRouter;
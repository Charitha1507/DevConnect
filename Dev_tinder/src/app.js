const express= require('express');
const app= express();
require('./config/database');
const connectDb = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');
const cors=require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/requests', requestRouter);
app.use('/',userRouter);




//get a user by email
// app.get("/user",async(req,res)=>{
//     try{
//         const user=await User.find({email:req.body.email});
//         if(user.length > 0) {
//             res.send(user);
//         } else {
//             res.status(404).send("User not found");
//         }
//     }catch(err){
//         res.status(500).send("Error fetching user: " + err.message);
//     }
// });

// //get all users
// app.get("/feed",async(req,res)=>{
//    try{
//     const data= await User.find({});
//    res.send(data);  
//    }catch(err){
//     res.status(500).send("Error fetching feed: " + err.message);
//    }
// });

// //delete a user by id
// app.delete("/user",async(req,res)=>{
//    try{
//        const user=await User.findByIdAndDelete(req.body.id);
//        if(user){
//            res.send("User deleted successfully");
//        }else{
//            res.status(404).send("User not found");
//        }
//    }catch(err){
//        res.status(500).send("Error deleting user: " + err.message);
//    }
// });

// //update a user by id
// app.patch("/user:id",async(req,res)=>{
//     const userid= req.params?.id;
//     const data= req.body;

//     try{
//      const allowedUpdates = ['firstName', 'lastName', 'skills','photoURL','about', 'password', 'age'];
//     const isUpdateValid = Object.keys(data).every((key) => allowedUpdates.includes(key));
//     if (!isUpdateValid) {
//         return res.status(400).send("Invalid update fields");
//     }
//     if(data.skills.length>10){
//         return res.status(400).send("Skills cannot exceed 10 items");
//     }
//       const user=await User.findByIdAndUpdate({_id: userid}, data);
//     }catch(err){
//         res.status(500).send("Error updating user: " + err.message);
//     }
// }); 

//start the server
connectDb().then(()=>{
    console.log('connected to database');
    app.listen(1511 ,()=>{
    console.log(`Server is listening on port 1511`);
});
}).catch(err => console.log(err));


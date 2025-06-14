import { useState } from "react";
import Usercard from "./Usercard";
import axios from 'axios';
import {useDispatch} from "react-redux";
import { addUser } from './utils/userSlice';

const Editprofile = ({user}) => {
   const [firstName, setFirstName] = useState(user?.firstName || "");
const [lastName, setLastName] = useState(user?.lastName || "");
const [age, setAge] = useState(user?.age || "");
const [gender, setGender] = useState(user?.gender || "");
const [about, setAbout] = useState(user?.about || "");
const [skills, setSkills] = useState(user?.skills || "");
const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [error,setError]=useState("");
    const [showToast,setShowtoast]=useState(false);
    const dispatch=useDispatch();

   const saveProfile = async () => {
    setError("");
    try {
        const res = await axios.patch(
            "http://localhost:1511/profile/edit",
            { firstName, lastName, photoURL, age, gender, about, skills },
            { withCredentials: true }
        );
        dispatch(addUser(res.data));
        setShowtoast(true);
        setTimeout(() => setShowtoast(false), 3000);
    } catch (err) {
        setError(err.response?.message || err.message);
    }
};
    return (
     
       <div className="flex justify-center my-10 ">
         {showToast && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 text-lg font-semibold">
    Profile updated successfully!
  </div>
)}
         <div className="form-control mx-10">
            <fieldset className="flex justify-center items-center min-h-screen">
                <legend className="fieldset-legend">Edit Profile</legend>

                <label className="label">First Name</label>
                <input type="text" className="input" placeholder="First Name" name="firstName"
                    value={firstName} onChange={e => setFirstName(e.target.value)} />

                <label className="label">Last Name</label>
                <input type="text" className="input" placeholder="Last Name" name="lastName"
                    value={lastName} onChange={e => setLastName(e.target.value)} />

                <label className="label">Age</label>
                <input type="number" className="input" placeholder="Age" name="age"
                    value={age} onChange={e => setAge(e.target.value)} />

                <label className="label">Gender</label>
                <input type="text" className="input" placeholder="Gender" name="gender"
                    value={gender} onChange={e => setGender(e.target.value)} />

                <label className="label">About</label>
                <textarea className="input" placeholder="About" name="about"
                    value={about} onChange={e => setAbout(e.target.value)} />

                <label className="label">Skills</label>
                <input type="text" className="input" placeholder="Skills (comma separated)" name="skills"
                    value={skills} onChange={e => setSkills(e.target.value)} />

                <label className="label">Photo URL</label>
                <input type="text" className="input" placeholder="Photo URL" name="photoURL"
                    value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
            </fieldset>
        <p>{error}</p>
        <button className="btn btn-primary mt-6 w-full text-lg" onClick={saveProfile}>Save Profile</button>
        </div>
        <div>
        <Usercard user={{firstName,lastName,photoURL,age,gender,about,skills}}/>
       </div>
       </div>
    );
};

export default Editprofile; 
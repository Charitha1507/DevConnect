
const Usercard=({user})=>{
    const {firstName,lastName,photoURL,age,gender,about,skills}=user;
    return (
        <div className="card bg-base-3 00 w-96 shadow-sm">
  <figure>
    <img
      src={photoURL} alt="User_img" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName} </h2>
     {age&&gender&&<p>{age +" "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    );
};

export default Usercard;
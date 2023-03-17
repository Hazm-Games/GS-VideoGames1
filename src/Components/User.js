import React, { useState, useEffect } from "react";


const DisplayUser = ({ updateUser }) => {
  const [userDetails, setUserDetails] = useState({});
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  
  
  const token = window.localStorage.getItem("token");


  const _displayUser = (ev)=> {
    ev.preventDefault();
    updateUser({ id:userDetails.id, username, email, phoneNumber});
  };
  

  useEffect(() => {
    fetch("/api/auth/", {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUserDetails({...user, id:user.id});
        //console.log(user);
      });
  }, []);

  return (
    <ul>

    <h1 style={{fontSize:'30px'}}>Account Details </h1>
    <p style={{textAlign:'center'}}>Re-Enter or Update Username</p>
    <form onSubmit={ _displayUser }>
    <input
      placeholder={userDetails.username}
      value = { username }
      onChange = { ev => setUsername(ev.target.value) }
      />
      <p style={{textAlign:'center'}}>Update Email</p>
    <input
      placeholder='example@email.com'
      value={ email }
      onChange = { ev => setEmail(ev.target.value) }
    />
    <p style={{textAlign:'center'}}>Update Phone Number</p>
    <input
      placeholder='add phone number'
      value={ phoneNumber }
      onChange = { ev => setPhoneNumber(ev.target.value) }
    />
    <button style={{paddingTop:'10px'}}>Save Changes</button>
    </form>
   
 

    </ul>
  );
};

export default DisplayUser;

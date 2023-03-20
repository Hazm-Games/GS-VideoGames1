import React, { useState, useEffect } from "react";
import Cart from "./Cart";

const DisplayUser = ({ updateUser }) => {
  const [userDetails, setUserDetails] = useState({});
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [carts, setCarts] = useState([]);

  const token = window.localStorage.getItem("token");

  const _displayUser = (ev) => {
    ev.preventDefault();
    updateUser({ id: userDetails.id, username, email, phoneNumber });
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
        setUserDetails({ ...user, id: user.id });
        //console.log(user);
      });
      fetch("/api/auth/user/carts", {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((carts) => {
        setCarts(carts);
      console.log(carts);})
  }, []);

  return (
    <ul>
      <h1 style={{ fontSize: "30px" }}>Account Details </h1>
      <p style={{ textAlign: "center" }}>Re-Enter or Update Username</p>
      <form onSubmit={_displayUser}>
        <input
          placeholder={userDetails.username}
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <p style={{ textAlign: "center" }}>Update Email</p>
        <input
          placeholder="example@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <p style={{ textAlign: "center" }}>Update Phone Number</p>
        <input
          placeholder="add phone number"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
        />
        <button style={{ paddingTop: "10", width: '96%', paddingBottom: '10', borderRadius: '8px'  }}>Save Changes</button>
        
      </form>
      <form>
      <button style={{ width: '96%', display: 'block', paddingTop: '10', paddingBottom: '10', borderRadius: '8px' }}
       onClick =  {carts.map((cart) => {
        return ( 
          <li className="nostyle" key={cart.id}>
          <div>
          {cart.products}
       </div>
       </li>
        )
      }
  )}
      >
      Show Order History
    </button>
    </form>
    </ul>
  );
};

export default DisplayUser;

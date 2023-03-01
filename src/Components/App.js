import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import BasicSelect from "./SelectPlatforms";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const [auth, setAuth] = useState({});
  const attemptLogin = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/", {
        method: "GET",
        headers: {
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((user) => setAuth(user));
    }
  };

  useEffect(() => {
    attemptLogin();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  const login = async ({ username, password }) => {
    fetch("/api/auth/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          attemptLogin();
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div>
<header>
<div class="top-bar">
          <div>
          <Link className="logo" to="/">
        <img
          className="logo"
          src="../../static/Files/HAZM-logo.png"
          alt="Site logo"
        />
         </Link>

          </div>
          <div class="account-info">

          <Link className="mwhite" to="/account">Account</Link>
          <Link>
          <img
          width="25px"
          height="auto"
          src="../../static/Files/user-icon.png"
          alt="user icon"
        />
         </Link>


          <Link className="mwhite" to="/cart">cart</Link>

          <Link>
          <img
          width="25px"
          height="auto"
          src="../../static/Files/shoppingCart.png"
          alt="shopping cart"
        />
         </Link>


           
            
            
          </div>
          </div>
  
      <nav>

     


        {auth.id ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/playstation">Playstation</Link>
            <Link to="/xbox">Xbox</Link>
            <Link to="/nintendo">Nintendo</Link>
            <Link to="/deals">Deals</Link>
            <button className="loginBtn" onClick={logout}>Logout {auth.username}</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      
      </header>
      <Routes>
        {auth.id ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login login={login} />} />
          </>
        )}
      </Routes>
    
    
    </div>
  );
};

export default App;

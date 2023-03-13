
import React, {useEffect} from "react";
import { Link } from "react-router-dom"

const Nav = ({ auth, logout }) => {

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { auth, logout } = props;


  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="div1">
            <Link className="logo" to="/">
              <img
                className="logo"
                src="/static/Files/updateLogo1.png"
                alt="Site logo"
              />
            </Link>
          </div>

          <div className="account-info">
            <div className="gap">

            <Link>
              <img
                className="icon"
                width="32px"
                height="auto"
                src="/static/Files/user-icon.png"
                alt="user icon"
              />
            </Link>

            <div>
            <Link className="mwhite" to="/user">
              Account
            </Link>

              <Link>
                <img
                  className="icon"
                  width="32px"
                  height="auto"
                  src="/static/Files/user-icon.png"
                  alt="user icon"
                />
              </Link>

              <div>
                <Link className="mwhite" to="/user">
                  Account
                </Link>
              </div>

            </div>

            
      

            <div className="gap">
            <Link>
              <img
                width="32px"
                height="auto"
                src="/static/Files/shoppingCart.png"
                alt="shopping cart"
              />
            </Link>




            <div className="gap">
              <Link>
                <img
                  width="32px"
                  height="auto"
                  src="/static/Files/shoppingCart.png"
                  alt="shopping cart"
                />
              </Link>

              <div>
                <Link className="mwhite" to="/cart">
                  cart
                </Link>
              </div>
            </div>

           


          </div>
        </div>

        <nav>
          {auth.id ? (
            <>
              <ul className="ul">
                <Link className="fab" to="/">
                  Home
                </Link>
                <Link className="fab" to="/playstation">
                  Playstation
                </Link>
                <Link className="fab" to="/xbox">
                  Xbox
                </Link>
                <Link className="fab" to="/nintendo">
                  Nintendo
                </Link>
                <Link className="fab" to="/deals">
                  Deals
                </Link>
                <Link className="fab" to="/products">
                  Products
                </Link>
                <button className="loginBtn" onClick={logout}>
                  {" "}
                  Logout {auth.username}
                </button>
              </ul>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Nav;

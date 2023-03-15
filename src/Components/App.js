import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Nav from "./Nav";
import Products from "./Products";
import { Link, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import NintendoProducts from "./Nintendo";
import XboxProducts from "./Xbox";
import PlaystationProducts from "./Playstation";
import DealProducts from "./Deals";
import Admin from "./Admin";
import Cart from "./Cart";
import DisplayUser from "./User";


const Search = ({ products }) => {
  const { term } = useParams();
  const navigate = useNavigate();
  return (
    <ul>
      <input
        placeholder="search for games"
        onChange={(ev) => {
          navigate(`/products/search/${ev.target.value}`);
          console.log(ev.target.value);
        }}
      />
      {products
        .filter((product) => {
          return !term || product.name.includes(term);
        })
        .map((product) => {
          return <li key={product.id}>{product.name}</li>;
        })}
    </ul>
  );
};

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [ cart, setCart] = useState({});
  const location = useLocation();
  const navigate = useNavigate();


  console.log(auth);

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
        .then((user) => {
          setAuth(user);
          fetch(`/api/cart/${user_id}`)
            .then((response) => response.json())
            .then((cart) => setCart(cart));
        });
    }
  };
       
    




  useEffect(() => {
    attemptLogin();
  }, []);

 /*  useEffect(() => {
    if (token) {
      fetch("/api/user/", {
        method: "GET",
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);
 */

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  useEffect(()=> {
    const path = location.pathname;
    if(path === '/login' && auth.id){
      navigate('/');
    }
  }, [auth]);
  console.log(auth)

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    navigate('/login');
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
     

  const register = async ({ username, password }) => {
    fetch("/api/auth/register", {
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


      
<Nav auth={auth} logout={logout} />


      <Routes>
        <Route path="/products" element={<Products products={products} />} />

        <Route path="/cart" element={< Cart Cart={Cart} setCart={setCart}/> } />

        <Route
          path="/nintendo"
          element={<NintendoProducts NintendoProducts={NintendoProducts} />}
        />

        <Route
          path="/playstation"
          element={
            <PlaystationProducts PlaystationProducts={PlaystationProducts} />
          }
        />

        <Route
          path="/xbox"
          element={<XboxProducts XboxProducts={XboxProducts} />}
        />

        <Route
          path="/deals"
          element={<DealProducts DealProducts={DealProducts} />}
        />

        <Route
          path="/products/:id"
          element={<SingleProduct singleProduct={SingleProduct} />}
        />

        <Route
          path="/products/search"
          element={<Products products={products} />}
        />

        <Route
          path="/products/search/:term"
          element={<Products products={products} />}
        />

        <Route path="/admin" element={<Admin admin={Admin} />} />

        <Route path="/user" element={<DisplayUser DisplayUser={DisplayUser} />} />

        {auth.id ? (
          <Route path="/" element={<Home auth={auth} />} />
        ) : (
          <Route path="/login" element={<Login login={login} />} />
          ) 
          
          }
          <Route path="/register" element={< Register register={register}/> } />

          
          
      </Routes>
    </div>
  );
};

export default App;

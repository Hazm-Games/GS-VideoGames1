import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Nav from "./Nav";
import Products from "./Products";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import NintendoProducts from "./Nintendo";
import XboxProducts from "./Xbox";
import PlaystationProducts from "./Playstation";
import DealProducts from "./Deals";




const Search = ({ products })=> {
  const { term } = useParams ();
  const navigate = useNavigate();
  return ( 
    <ul>
    <input placeholder='search for games' 
    onChange = {
      (ev)=> {
      navigate(`/products/search/${ev.target.value}`);
      console.log(ev.target.value);
      }
    } />
  {products.filter (product => {
      return !term ||  product.name.includes(term)
    }).map( product => {
    return (
  <li key={ product.id }>
   {product.name}
  </li>
    );
    })
  }
  </ul>
  );
  };
  
  
  
  
const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
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

      <Nav auth={auth} />


      <Routes>
        <Route path="/products" element={<Products products={products} />} />


        <Route path="/nintendo" element={<NintendoProducts NintendoProducts={NintendoProducts} />} />

        <Route path="/playstation" element={<PlaystationProducts PlaystationProducts={PlaystationProducts} />} />

        <Route path="/xbox" element={<XboxProducts XboxProducts={XboxProducts} />} />

        <Route path="/deals" element={<DealProducts DealProducts={DealProducts} />} />

        <Route path="/products/:id" element={<SingleProduct singleProduct={SingleProduct} />} />

        <Route path="/products/search" element={<Products products={products} />} />

        <Route path="/products/search/:term" element={<Products products={products} />} />

        {auth.id ? (
          <Route path="/" element={<Home auth={auth} />} />
        ) : (
          <Route path="/login" element={<Login login={login} />} />
          ) (
          <Route path="/register" element={<Register register={register} />} />
          )}
      </Routes>
    </div>
  );
};

export default App;

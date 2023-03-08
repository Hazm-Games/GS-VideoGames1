import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Nintendo = ({}) => {
    
        const [nintendoProducts, setNintendoProducts] = useState([]);
      
   
   
    useEffect(() => {
        fetch(`/api/nintendo`)
          .then((response) => response.json())
          .then((nintendoProducts) => {
           setNintendoProducts(nintendoProducts);
           
          });
      }, []);

    return (
      <ul>
        {nintendoProducts.map((nintendoProduct) => {
          return (
            <li key={nintendoProduct.id}>
              <h3>
              <Link to={`/products/${nintendoProduct.id}`}>{nintendoProduct.name}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    );
  };

  export default Nintendo
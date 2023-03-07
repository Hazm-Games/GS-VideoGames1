import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Xbox = ({}) => {
    
        const [xboxProducts, setXboxProducts] = useState([]);
 
   
   
    useEffect(() => {
        fetch(`/api/xbox`)
          .then((response) => response.json())
          .then((xboxProducts) => {
           setXboxProducts(xboxProducts);
        
          });
      }, []);

    return (
      <ul>
        {xboxProducts.map((xboxProduct) => {
          return (
            <li key={xboxProduct.id}>
              <h3>
              <Link to={`/products/${xboxProduct.id}`}>{xboxProduct.name}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    );
  };

  export default Xbox
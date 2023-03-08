import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Playstation = ({}) => {
    
        const [playstationProducts, setPlaystationProducts] = useState([]);
    
   
   
    useEffect(() => {
        fetch(`/api/playstation`)
          .then((response) => response.json())
          .then((playstationProducts) => {
           setPlaystationProducts(playstationProducts);
       
          });
      }, []);

    return (
      <ul>
        {playstationProducts.map((playstationProduct) => {
          return (
            <li key={playstationProduct.id}>
              <h3>
              <Link to={`/products/${playstationProduct.id}`}>{playstationProduct.name}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    );
  };

  export default Playstation
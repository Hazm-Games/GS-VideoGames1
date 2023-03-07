import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Deals = ({}) => {
    
        const [dealProducts, setDealProducts] = useState([]);
    
   
   
    useEffect(() => {
        fetch(`/api/deals`)
          .then((response) => response.json())
          .then((dealProducts) => {
           setDealProducts(dealProducts);
           
          });
      }, []);

    return (
      <ul>
        {dealProducts.map((dealProduct) => {
           
          return (
            <li key={dealProduct.id}>
              <h3>
              <Link to={`/products/${dealProduct.id}`}>{dealProduct.name}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    );
  };

  export default Deals
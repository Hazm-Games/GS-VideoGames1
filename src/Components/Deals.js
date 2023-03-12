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
      
      <div className="games-shelf">
        <h1 className="shelf-heading">OUR BEST DEALS</h1>
      <ul className="game-grid">
     
        {dealProducts.map((dealProduct) => {
           
          return (
            <Link to={`/products/${dealProduct.id}`}>
            <div className="game-card">

              <img className="sale-icon" src="../static/Files/sale.png" />
           
            <img src={dealProduct.image_url} />
              <h3>
              <Link to={`/products/${dealProduct.id}`}>{dealProduct.name}</Link>
              </h3>
              <p>${dealProduct.price}</p>
            
           
            </div>
            </Link>
          );
        })}
      </ul>
      </div>
    );
  };

  export default Deals
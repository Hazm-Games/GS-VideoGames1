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
      <div className="games-shelf">
      <ul className="game-grid">
        {nintendoProducts.map((nintendoProduct) => {
          return (
           
            <Link to={`/products/${nintendoProduct.id}`}> 
             <div className="game-card">
             <img src={nintendoProduct.image_url} />
              
             {nintendoProduct.name}
              
              <p>${nintendoProduct.price}</p>
              <a className="cardBtn">Tell me more!</a>
            </div>
            </Link>
          
          );
        })}
      </ul>
      </div>
    );
  };

  export default Nintendo
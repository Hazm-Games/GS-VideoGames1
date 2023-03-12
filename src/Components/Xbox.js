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
      <div className="games-shelf">
      <ul className="game-grid">
        {xboxProducts.map((xboxProduct) => {
          return (
           
            <Link to={`/products/${xboxProduct.id}`}> 
             <div className="game-card">
             <img src={xboxProduct.image_url} />
              
             {xboxProduct.name}
              
              <p>${xboxProduct.price}</p>
              <a className="cardBtn">Tell me more!</a>
            </div>
            </Link>
          
          );
        })}
      </ul>
      </div>
    );
  };

  export default Xbox
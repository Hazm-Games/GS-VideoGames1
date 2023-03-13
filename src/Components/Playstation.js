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
      <div className="games-shelf">
      <ul className="game-grid">
        {playstationProducts.map((playstationProduct) => {
          return (
           
            <Link to={`/products/${playstationProduct.id}`}> 
             <div className="game-card">
             <img src={playstationProduct.image_url} />
              
             {playstationProduct.name}
              
              <p>${playstationProduct.price}</p>
              <a className="cardBtn">Tell me more!</a>
            </div>
            </Link>
          
          );
        })}
      </ul>
      </div>
    );
  };

  export default Playstation
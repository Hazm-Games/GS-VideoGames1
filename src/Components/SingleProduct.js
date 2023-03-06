import React from "react";
import { useParams, link } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleProduct = ({}) => {
  const [singleProduct, setSingleProduct] = useState({});
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((singleProduct) => {
       setSingleProduct(singleProduct);
        console.log(singleProduct);
      });
  }, []);

  return (
   
  

    <ul>
    <img 
    src={singleProduct.image_url}
    />
    
      <li>{singleProduct.name}</li>
      <li>{singleProduct.description}</li>
      <li>{singleProduct.price}</li> 
      <li>{singleProduct.condition}</li>
      <li>{singleProduct.platform_id}</li>
      <li>{singleProduct.onSale}</li>
    </ul>
  );
};

export default SingleProduct;

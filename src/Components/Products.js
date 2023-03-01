import React from "react";
const express = require('express')
const router = (express.Router);
const { authenticate, getUserbytoken,  } require ('..')

const products = ({products}) => {
return (
    <ul>
    {
        products.map( product => {
            return (
                <li key ={product.id}>
                {product.name}
                </li>
            )
        })
    }
    </ul>
)



}

export default products
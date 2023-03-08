const client = require('./client');

const createProduct = async({ name, description, price, image_url, condition,platform_id,onSale }) => {
   try {
   
   const { rows: [products] } = await client.query(`
      INSERT INTO products(name, description, price, image_url, condition,platform_id,"onSale")
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    ,[name, description, price, image_url, condition,platform_id,onSale]);
    
    return products;
} catch (error) {
    throw error;
    }
    };

    const getProducts = async () => {
  
      const SQL = `
      SELECT *
      FROM products`
      const response = await client. query (SQL);
      return response.rows;
    }

   const getSingleProduct = async (id) => {
   
   const SQL = `
   SELECT *
    FROM products 
    WHERE id = $1
    ` 
    const response = await client. query (SQL,[id]);
    return response.rows[0];
  }

  const getNintendoProducts = async () => {
   
    const SQL = `
    SELECT *
     FROM products 
     WHERE platform_id = 3
     ` 
     const response = await client. query (SQL);
     return response.rows;
   }

   const getPlaystationProducts = async () => {
   
    const SQL = `
    SELECT *
     FROM products 
     WHERE platform_id = 2
     ` 
     const response = await client. query (SQL);
     return response.rows;
   }

   const getXboxProducts = async () => {
   
    const SQL = `
    SELECT *
     FROM products 
     WHERE platform_id = 1
     ` 
     const response = await client. query (SQL);
     return response.rows;
   }

   const getDealProducts = async () => {
   
    const SQL = `
    SELECT *
     FROM products 
     WHERE "onSale" = true
     ` 
     const response = await client. query (SQL);
     return response.rows;
   }

    module.exports = {
        createProduct,
        getProducts,
        getSingleProduct,
        getNintendoProducts,
        getPlaystationProducts,
        getXboxProducts,
        getDealProducts,
      };
      
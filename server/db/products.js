const client = require('./client');

const createProduct = async({ name, description, price, image_url, condition, platform_id }) => {
   try {
    console.log(name, description, price, image_url, condition, platform_id)
   const { rows: [products] } = await client.query(`
      INSERT INTO products(name, description, price, image_url, condition, platform_id)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`
    ,[name, description, price, image_url, condition]);
    
    return products;
} catch (error) {
    throw error;
    }
    };
  
    module.exports = {
        createProduct,
      };
      
const client = require('./client');

const createProduct = async({ title,  thumbnail, short_description, genre, price, onSale, platform_id }) => {
   try {
   // console.log(name, description, price, image_url, condition, platform_id)
   const { rows: [products] } = await client.query(`
      INSERT INTO products(title, thumbnail, short_description, genre, price, "onSale", platform_id)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    ,[title, thumbnail, short_description, genre, price, onSale,  platform_id]);
    
    return products;
} catch (error) {
    throw error;
    }
    };
  
    module.exports = {
        createProduct,
      };
      
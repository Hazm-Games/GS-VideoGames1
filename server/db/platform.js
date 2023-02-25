const client = require('./client');

const addPlatform = async({ name }) => {
   try {
    console.log(name)
   const { rows: [platform] } = await client.query(`
      INSERT INTO platform(name)
      VALUES($1) RETURNING *;`
    ,[name]);
    
    return platform;
} catch (error) {
    throw error;
    }
    };
  
    module.exports = {
        addPlatform,
      };
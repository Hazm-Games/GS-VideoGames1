const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const createUser = async({ username, password, isAdmin }) => {
  const SQL = `
    INSERT INTO users(username, password, "isAdmin")
    VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ username, password, isAdmin ]);
  return response.rows[0];
}

const getUserByToken = async(token) => {
  const payload = await jwt.verify(token, JWT);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [ payload.id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user; 
}

const getUserByUserName = async({username}) =>{
  const SQL =`
  SELECT *
  FROM users
  WHERE username = $1 
  `;
  const response = await client.query(SQL,[username]);
  const user = response.rows[0]
  return user
  
}



const authenticate = async({ username, password }) => {
  const SQL = `
    SELECT id
    FROM users
    WHERE username = $1 and password = $2
  `;
  const response = await client.query(SQL, [ username, password]);
  console.log(response);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT);
}

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getUserByUserName

};


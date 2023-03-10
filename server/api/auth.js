const express = require('express');
const router = express.Router();
const {getUserByUserName} = require('../db/User')
const {
  authenticate,
  getUserByToken
} = require('../db');

module.exports = router;
// current location is api/auth
router.post('/', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

router.post('/register',async(req, res, next)=>{
  try{
   const {username,password} = req.body
   
  
     const _user = await getUserByUserName({username})
     if(_user){
      res.send({
        error:"Username Taken",
        message:"User ${username} is already taken.Please login or try a different username.",
        name:"Username Taken"
      }) 
      return
     }

     if(password.length<8){
      res.send({
        error:"Password Too Short!",
        message:"Password is too short must have at least 8 character",
        name:"Password Too Short!"
      })
      return
     }
     const user = await createUser({username, password})
     
     const token = await authenticate({username, password});
    res.send({ token });
   
     
  } 
     catch(error){
      next(error);
     }
  })


     //check if user exists. If so, send an error message
     // otherwise, create a new user with the createUser function (from ../db/User.js)
     // after creating a user, create a token with jwt.sign()
     // send the token back to the client

router.get('/', async(req, res, next)=> {
  try {
    res.send(await getUserByToken(req.headers.authorization)); 
  }
  catch(ex){
    next(ex);
  }
});

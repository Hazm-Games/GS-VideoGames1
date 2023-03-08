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
   const username = req.body
   const password = req.body
  try{
     const user = await getUserByUserName({username})
     // check if user exists. If so, send an error message
     // otherwise, create a new user with the createUser function (from ../db/User.js)
     // after creating a user, create a token with jwt.sign()
     // send the token back to the client
  }
  catch(ex){
    next(ex);
  }
});

router.get('/', async(req, res, next)=> {
  try {
    res.send(await getUserByToken(req.headers.authorization)); 
  }
  catch(ex){
    next(ex);
  }
});

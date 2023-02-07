const express = require('express');
const User = require('../modules/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser')

const router = express.Router();
const {body,validationResult} = require('express-validator');
const { findOne } = require('../modules/User');

const jwt_secret = 'Chiragisferocious!';

// ROUTE 01:  Creating  a user  using POST: "/api/auth/createUser"
router.post('/createUser',[
     body('name','Enter a valid name').isLength({min:3}),
     body('email','Enter a valid Email').isEmail(),
     body('password','Password too Short try again').isLength({min:5})
], async (req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array(),success})
    }
  try{
    //Check whether the user with same email  already exist or not
    let user  = await  User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email handle already exist",success})
    }
//    const newUser = User(req.body);
//    console.log(req.body);
//    newUser.save();
//    res.send(req.body); 
    const salt  = await bcrypt.genSalt(10);
    const secpswd  = await bcrypt.hash(req.body.password, salt);
     user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secpswd,
 })
 const data = {
   user: {
     id:user.id
    }
 }
 const authtoken = jwt.sign(data,jwt_secret);
// .then((user)=>res.json(user))
//     .catch((err)=>res.json({error: 'please enter a unique email',message:err.message}))
    //  res.json(user);
    success = true;
    res.json({authtoken,success});  // authtoken generated and return to user

}catch(err){
    console.log(err.message);
    res.status(500).send('Bad Request!');
}

})



//ROUTE 02: Authenticating a user with login endpoint "/api/auth/login"


router.post('/login',[
    
    body('email','Enter a valid Email').isEmail(),
    body('password','password cannot be blanked').exists()

], async (req,res)=>{
    let success = false;
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array()})
   }
   const {email,password} = req.body;
   try{
    let user  = await User.findOne({email});//{email:req.body.email} only differnece is thatv i have done destructuring HERE
    if(!user){
        return res.status(400).json({error:"please try again with correct credentials",success});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        res.status(400).json({error:"please try again with correct credentials",success})
    }
   const data = {
        user: {
          id:user.id
         }
      }
      const message = "USER lOGIN SUCCESSFUL!"
      const auth_token = jwt.sign(data,jwt_secret);
      success =true;
      res.json({auth_token,message,success});
      
    
   }
  catch(err){
    console.error(err.message)
    res.status(500).send('Bad Request!');
  }

})

// ROUTE 03: Getting DETAILS oF LOGGED IN USER  using post : "/api/auth/getDetails" Login is necessary to get details of user which is signed in
    // now we will require authorization using jwt once authentication is done 
router.get('/getuser',fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
   res.send(user);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Bad Request!')
    }
    
})

module.exports = router;
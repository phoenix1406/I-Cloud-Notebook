// ITS A middle ware function which will fetch my user id from jwt token 
const jwt = require('jsonwebtoken');
const jwt_secret = 'Chiragisferocious!';
const fetchuser = (req,res,next)=>{
    const token  = req.header('auth-token');
    
   
    if(!token){
        res.status(400).json({error:"please authenticate using a valid token"})
    }
    try{
        const data  =jwt.verify(token,jwt_secret); //so it will return me the data after the token is decoded.
        req.user = data.user; // and the user whose data will be matched in our database we will be assigning that value to our user in given req
        next();
    }catch(err){
        console.error(err.message);
        res.status(400).send({error: "Bad request!"})
    }
}
module.exports  = fetchuser;
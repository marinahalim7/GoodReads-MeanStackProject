const jwt = require("jsonwebtoken")

const auth = function auth(req, res, next){
   // check the token and equal it by var
 
   const token = req.body.token || req.query.token || req.headers["x-access-token"]


   // verify that token in exist
   if(!token){
    return res.status(403).send(" A token is required for authentication")
   }
   try{
   const decoded = jwt.verify(token, process.env.TOKEN_KEY);
   req.user = decoded;
   return next();
   }
   catch(err){
 return res.status(401).send("Invalid Token")
   }

   
}

module.exports = auth;
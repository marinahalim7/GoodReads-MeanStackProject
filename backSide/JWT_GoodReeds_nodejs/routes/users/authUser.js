const express = require('express');
const router = express.Router();
//const User = require("../../models/User");
const upload = require('../../middleware/multer');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const auth =require('../../middleware/authJWT');

//usersAuth/register
//end point for register
router.post('/register',upload.single('image'), async(req, res)=>{
    if(req.file == undefined){
    try{
    // distruct specific attr from body
    const { username, lastname, email, password, img } = req.body;
    
    // validate user input when you signUp
    if(!(email && password && username && lastname)){
        res.status(400).send(" input is required")
    
    }
    // check if user already exist
    // validate if user exist in our database
    const oldUSer = await UserModel.findOne({ email });
    
    if(oldUSer) {
        
       return res.send(" User Already Exist, Please Login not register")
    }

    // now, ther in no user so In need to create user
     encryptedPassword = await bcrypt.hash(password, 10);

     const newUser = await UserModel.create({
        username,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword
         });

    // create token
    const token = jwt.sign(
        {user_id: newUser._id, email},
        process.env.TOKEN_KEY
    );

   // save user token
   newUser.token = token;
   
   // return new user
   res.status(201).json(newUser);
   console.log(newUser)
    }
    catch (err){
        console.log(err);
    }}
    else{
        try{
             // distruct specific attr from body
    const { username, lastname, email, password, img } = req.body;
    
    // validate user input when you signUp
    if(!(email && password && username && lastname)){
        res.status(400).send(" input is required")
    
    }
    // check if user already exist
    // validate if user exist in our database
    const oldUSer = await UserModel.findOne({ email });
    
    if(oldUSer) {
        
       return res.send(" User Already Exist, Please Login not register")
    }

    // now, ther in no user so In need to create user
     encryptedPassword = await bcrypt.hash(password, 10);

     const newUser = await UserModel.create({
        username,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        img: process.env.IMG_URL+req.file.filename

         });

    // create token
    const token = jwt.sign(
        {user_id: newUser._id, email},
        process.env.TOKEN_KEY
    );

   // save user token
   newUser.token = token;
   
   // return new user
   res.status(201).json(newUser);
   console.log(newUser)
        }
        catch(err){
            console.log("ggg")
            res.status(500).send({message:err});
        }
    }
})



// end point for login

router.post('/login', async(req, res)=>{
    try{
        // get user input
        const {email, password } = req.body;
         
        // validate user input
        if(!(email && password)){
            res.status(400).send(" All input is required"); 
        }
        
        // validate if user exist in our data base it will check by email
        const user = await UserModel.findOne({ email });
        
        // if user have value and check passwor that we inside it as the same password that exist in database
        if(user && (await bcrypt.compare(password, user.password))){
            // create token
            const token = jwt.sign(
                { user_id: user._id, email},
                process.env.TOKEN_KEY);
    
                // save user token
                user.token = token;
               console.log(token)
                // user
                return res.status(200).json(user);
        }
        return res.status(400).send(" Invalid Credentials");
    }
    catch(err)
    {
        console.log(err)
    }
    })
    

    // request and route for welcome
router.use('/welcome', auth, (req, res)=>{
    console.log(req.user)
    res.status(200).send("Welcome");
});






module.exports = router;
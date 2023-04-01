const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const auth =require('../../middleware/authJWT');


router.post('/register',upload.single('image'), async(req, res)=>{
    if(req.file == undefined){
    try{
    const { username, lastname, email, password, img } = req.body;
    
    if(!(email && password && username && lastname)){
        res.status(400).send(" input is required")
    
    }
 
    const oldUSer = await UserModel.findOne({ email });
    
    if(oldUSer) {
        
       return res.send(" User Already Exist, Please Login")
    }

     encryptedPassword = await bcrypt.hash(password, 10);
     const newUser = await UserModel.create({
        username,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword
         });

    const token = jwt.sign(
        {user_id: newUser._id, email},
        process.env.TOKEN_KEY
    );

   newUser.token = token;
   res.status(201).send({message:'success'});
   console.log(newUser)
    }
    catch (err){
        console.log(err);
    }}
    else{
        try{
          const { username, lastname, email, password, img } = req.body;
    
    if(!(email && password && username && lastname)){
        res.status(400).send(" input is required")
    
    }

    const oldUSer = await UserModel.findOne({ email });
    
    if(oldUSer) {
        
       return res.send(" User Already Exist, Please Login")
    }

     encryptedPassword = await bcrypt.hash(password, 10);

     const newUser = await UserModel.create({
        username,
        lastname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        img: process.env.IMG_URL+req.file.filename

         });

    const token = jwt.sign(
        {user_id: newUser._id, email},
        process.env.TOKEN_KEY
    );

   newUser.token = token;
   
   res.status(201).send({message:'success'});
   console.log(newUser)
        }
        catch(err){
            console.log("ggg")
            res.status(500).send({message:err});
        }
    }
})


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
                { user_id: user._id,username:user.username,lastname:user.lastname,email:user.email},
                process.env.TOKEN_KEY);
    
                // save user token
                user.token = token;
               console.log(token)
                // user
                return res.status(200).send({message:'success',token:user.token});
        }
        return res.status(400).send(" Invalid Credentials");
    }
    catch(err)
    {
        console.log(err)
    }
    })
    

router.use('/welcome', auth, (req, res)=>{
    console.log(req.user)
    res.status(200).send("Welcome");
});

module.exports = router;
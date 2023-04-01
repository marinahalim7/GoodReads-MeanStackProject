const express = require('express');
const router = express.Router();
const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// /admin
router.post('/',async(req,res, next)=>{
    try{
        const emailName = req.body.email;
        const adminPass = req.body.password;
        const is_admin = await UserModel.findOne({email:emailName,isAdmin:true});
        console.log(is_admin);
       //        const is_admin = await UserModel.findOne({email:emailName,isAdmin:true});
        //console.log(is_admin);
            if(is_admin && (await bcrypt.compare(adminPass,is_admin.password))){
                console.log("dddd")
                // create token
                const token = jwt.sign(
                    { user_id: is_admin._id,username:is_admin.username,lastname:is_admin.lastname,email:is_admin.email},
                    process.env.TOKEN_KEY);
                    // save user token
                    is_admin.token = token;
                   console.log(token)
                    // user
                    return res.status(200).send({message:'success',token:is_admin.token});
            //next(); // front
        }
        else{
            return res.status(400).send({message:" you arent admin"});
            //  next("error, please log in")
        }
    }catch(err)
    {
        res.status(500).send(err);
    }
})
//
// rout to handle error
router.use((err, req, res, next)=>{
    res.status(500).send(err)
})
module.exports=router;

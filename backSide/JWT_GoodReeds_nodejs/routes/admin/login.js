const express = require('express');
const router = express.Router();
const UserModel = require('../../models/User');
// /admin
router.post('/',async(req,res, next)=>{
    try{
        const adminName = req.body.username;
        const adminPass = req.body.password;
        const is_admin = await UserModel.findOne({username:adminName,password:adminPass,isAdmin:true}).count().exec();
       // console.log(admin);
        if(is_admin)
        {
            res.status(200).send("logged in");
            //next(); // front
        }
        else{
            res.send("you arent admin");
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
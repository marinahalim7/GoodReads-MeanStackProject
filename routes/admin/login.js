const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user');


// /admin
router.get('/',async(req,res, next)=>{
    try{
        const adminName = req.body.firstName;
        const adminPass = req.body.password;
        const admin = await UserModel.find({firstName:adminName,password:adminPass,isAdmin:true});
        console.log(admin);
        if(admin.length != 0)
        {
            
            res.status(200).json(admin);
            //next(); // front 
        }
        else{
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
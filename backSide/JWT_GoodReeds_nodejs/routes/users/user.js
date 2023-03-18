const express = require('express');
const router = express.Router();
const userModel = require('../../models/User');
//get
router.get('/', async (req, res) => {
    try {
        const user = await userModel.find({},{}).populate({
            path:"booksOfAuth_id"
        });
        res.json(user);
    } catch (err) {
        return res.status(500).send(err);
    }
})

//post
router.post('/', async(req, res)=>{
    try {
        const userInfo = {
            ...req.body
        }
        await userModel.create(userInfo);
        res.status(200).send(userInfo);
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get by id
router.get('/:id',async(req,res)=>
{
    try {
        const id=req.params.id;
        const email=req.query.email;
        const getOneUser=await userModel.find({_id:id,email:email});
        res.send(getOneUser)
    } catch (err) {
        return res.status(500).send(err);
    }
})
module.exports = router;










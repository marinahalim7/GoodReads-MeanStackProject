const express = require('express');
const router = express.Router();
const userBookModel = require('../../models/book');
//get
router.get('/', async(req, res)=>{
    try{
    const allBook = await userBookModel.find({},{reviews:0}).populate({
        path:"author_id"
        // select: {_id: 1}
    }).populate({
        path:"category_id"
        // select: {_id: 1}
    });
    console.log(allBook)
    return res.json(allBook);
    }
    catch(err){
     res.status(500).send(err)
    }
    })
module.exports = router;










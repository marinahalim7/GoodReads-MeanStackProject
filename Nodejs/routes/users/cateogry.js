const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category');
const bookModel = require('../../models/book');
router.get('/', async (req, res) => {
    try {
        const cateList = await categoryModel.find();
        res.json(cateList)
    } catch (err) {
        return res.status(500).send(err)
    }
})
router.get("/:id", async(req,res)=>
{
    try {
        const id = req.params.id;
          categoryList = await bookModel.find({category_id:id},{reviews:0}).populate({
            path:"author_id",
            select: {_id:1,first_name:1,last_name:1}
        }).populate({
            path:"category_id",
            select: {_id:1,name:1}
        });
          res.json(categoryList);
    } catch(err){
        res.status(500).send(err);
    }
})
module.exports = router;
const express = require('express');
const router = express.Router();
const authorModel = require('../../models/author');
const bookModel = require('../../models/book');
router.get('/', async (req, res) => {
    try {
        const author =await authorModel.find();
        res.json(author);
    } catch (err) {
        return res.status(500).send(err)
    }
})
router.get("/:id", async(req,res)=>
{
    try {
        const id = req.params.id;
        const author = await bookModel.find({author_id:id}).populate({
            path:"author_id",
            select: {_id:1,first_name:1,last_name:1,Date_of_birth:1,img:1}
        });
        res.json(author);
    } catch(err){
        res.status(500).send(err);
    }
})
module.exports = router;










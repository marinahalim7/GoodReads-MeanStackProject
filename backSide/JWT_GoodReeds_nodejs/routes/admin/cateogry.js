const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category');

//-------------------------------------------------------get all cat----------------------------
router.get('/', async (req, res) => {
    try {
        const cateList = await categoryModel.find({},{Book_id:0})
        res.json(cateList)
    } catch (err) {
        return res.status(500).send(err)
    }
})

//-----------------------------------------post--------------------------------
router.post('/', async (req, res) => {
    try {
        const category = { 
            name: req.body.name
         };
        

         await categoryModel.create(category);
        res.json(category);
        

    } catch (err) {
        res.status(500).send(err);
    }
})
//-------------------------------------------edit------------------------------
router.put("/:id", async(req,res)=>
{
    try {
        const id = req.params.id;
        const category = { 
            name: req.body.name
         };
         await categoryModel.findByIdAndUpdate({_id:id},category);
        res.json(category);
    } catch (err) {
        res.status(500).send(err);
    }
})
//-----------------------------------------delete----------------------------
router.delete('/:id', async(req,res)=>
{
    try {
        const id = req.params.id;
        const delCategory=await categoryModel.findByIdAndRemove({_id:id});
        res.json(delCategory);
    } catch (err) {
        res.status(500).send(err);
    }
})
module.exports = router;
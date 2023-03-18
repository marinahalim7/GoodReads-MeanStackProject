const express = require('express');
const upload = require('../../middleware/multer');
const router= express.Router();
const authorModel = require('../../models/author');

// get all author
router.get('/',async (req,res)=>{
    try{
        const authors = await authorModel.find({},{booksOfAuth_id:0});
         res.json(authors);
    }
    catch(err){
        res.status(500).send(err);
    }
})

// create author
router.post('/',upload.single('image'),async (req,res)=>{
    if(req.file === undefined ){
        try{
        const author = {
            ...req.body
             }
             await authorModel.create(author);
             res.json(author);
        }
        catch(err){
        res.status(500).send(err);
    }}
    else
    {
        try{
            const author = {
                ...req.body,
                img: process.env.IMG_URL+req.file.filename
                 }
                 await authorModel.create(author);
                 res.json(author);
            }
            catch(err){
            res.status(500).send(err);
        }
    }
})

// delete author by id
router.delete('/:id',async (req,res)=>{
    const id =req.params.id;
    try{
        const author =await authorModel.findByIdAndDelete({_id:id});
        res.send(author);
    }
    catch{
        res.status(500).send('failed');
    }
})

// update user by id
router.put("/:id",upload.single('image'),async(req,res)=>{  //test
    const id =req.params.id;
    if(req.file === undefined ){
        try{
        const author = {
            ...req.body
             }
            const update=await authorModel.findByIdAndUpdate({_id:id},author,{new:true});
            res.send(update);
        }
        catch(err){
        res.status(500).send(err);
    }}
    else
    {
        try{
            const author = {
                ...req.body,
                img: process.env.IMG_URL+req.file.filename
                 }
                const update=await authorModel.findByIdAndUpdate({_id:id},author,{new:true});
                res.send(update);
            }
            catch(err){
            res.status(500).send(err);
        }
    }
    })
    
module.exports=router;
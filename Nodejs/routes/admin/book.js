const express = require('express');
const BookModel = require('../../models/book');
const router = express.Router();
const upload = require('../../middleware/multer');
// get all books
router.get('/', async(req, res)=>{
    try{
    const book = await BookModel.find({},{reviews:0}).populate({
        path:"author_id",
        select: {_id: 1}
    }).populate({
        path:"category_id",
        select: {_id: 1}
    });
    return res.json(book);
    }
    catch(err){
     res.status(500).json(err)
    }
    })
// create book
router.post('/',upload.single('image'), async(req, res)=>{
    if(req.file === undefined){
    try{
        const bookBody = {
            ...req.body
        }
       await BookModel.create(bookBody);
       return res.json(bookBody);
    }catch(err){
            res.status(500).send(err);
        }}
        else{
            try{
                const bookBody = {
                    ...req.body,
                    img: process.env.IMG_URL+req.file.filename
                     }
                     console.log(bookBody);
                     await BookModel.create(bookBody);
                     res.json(bookBody);
                }
                catch(err){
                res.status(500).send(err);
            }
        }
    })
// edit book by id
    router.put("/:id",upload.single('image'),async(req,res)=>{  //test
        const id =req.params.id;
        if(req.file === undefined ){
            try{
            const bookBody = {
                ...req.body
                 }
                const update=await BookModel.findByIdAndUpdate({_id:id},bookBody,{new:true});
                res.send(update);
            }
            catch(err){
            res.status(500).send(err);
        }}
        else
        {
            try{
                const bookBody = {
                    ...req.body,
                    img: process.env.IMG_URL+req.file.filename
                     }
                    const update=await BookModel.findByIdAndUpdate({_id:id},bookBody,{new:true});
                    res.send(update);
                }
                catch(err){
                res.status(500).send(err);
            }
        }
        })
// delete author
router.delete('/:id', async(req, res)=>{
        try{
            const id = req.params.id;
            const book = await BookModel.findOneAndDelete({_id:id});
            return res.json(book)
        }
        catch(err){
             res.status(500).send(err);
        }
    })
 module.exports = router;
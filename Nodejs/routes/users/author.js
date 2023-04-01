const express = require('express');
const router = express.Router();
const authorModel = require('../../models/author');
const bookModel = require('../../models/book');
router.get('/', async (req, res) => {
    try {
        const author =await authorModel.find({},{__v:0});
        res.json(author);
    } catch (err) {
        return res.status(500).send(err)
    }
})
router.get("/:id", async(req,res)=>
{
    try {
        const id = req.params.id;      
        let ratingObject; 
        const author = await authorModel.findOne({_id:id});
        var books = await bookModel.find({author_id:id},{reviews:1,name:1,img:1});
        for(var i=0;i<books.length;i++){           
            ratingObject=await calBookRating(books[i].reviews);
            ratingObject["_id"]=books[i]._id; 
            ratingObject["img"]=books[i].img;  
            ratingObject["name"]=books[i].name;  
            books[i]= ratingObject;          
          }
       res.send({author:author,books:books});
    } catch(err){
        res.status(500).send(err);
    }
});
function  calBookRating(reviewArrayy){ 
    let count_rating=0;
    let sum_rating =0; 
    for(let i =0 ;i<reviewArrayy.length;i++){
        if(reviewArrayy[i].rate){
            sum_rating+=reviewArrayy[i].rate;
            count_rating++;  
        }
    }
   ratingObj={count_rate:count_rating,avg_rate:sum_rating/count_rating};
   return ratingObj;
  
}
module.exports = router;










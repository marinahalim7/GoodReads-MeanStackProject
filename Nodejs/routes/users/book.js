const express = require('express');
const router = express.Router();
const bookModel = require('../../models/book');
router.get('/', async (req, res) => {
    try {
        const books = await bookModel.find({},{img:1,name:1}).populate({
            path:"author_id",
            select: {_id:1,first_name:1,last_name:1}
        });
        res.json(books);
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.get("/:id", async(req,res)=>
{
    try {
        const id = req.params.id;
          var categoryList = await bookModel.findOne({_id:id},{reviews:0}).populate({
            path:"author_id",
            select: {_id:1,first_name:1,last_name:1}
        }).populate({
            path:"category_id",
            select: {name:1}
        });
      
        const reviewobj = await bookModel.findOne({_id:id},{reviews:1});
        const reviewArray =reviewobj.reviews;
        const countr = await calBookRating(reviewArray);
        var categoryListObj = categoryList.toObject();
        categoryListObj['numberOFrates']=countr.count_rate;
        categoryListObj['averageRate']=countr.avg_rate;

        res.send(categoryListObj);
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




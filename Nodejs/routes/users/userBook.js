const express = require('express');
const bookModel = require('../../models/book');
const router = express.Router();
const userBookModel = require('../../models/book');

router.post('/', async (req, res) => {
    try {
        const userId = req.body.user_id;
        const state = req.body.state;
       
        if(state == 'all'){
            console.log("in alll");
            let allbook=[];
            const books=  await bookModel.find().populate({
                path:"author_id",
                select: {_id:1,first_name:1,last_name:1}
            }).populate({
                path:"category_id",
                select: {name:1}
            });
            for(let i=0;i<books.length;i++){
                for(let y=0;y<books[i].reviews.length;y++)
                {
                    if(books[i].reviews[y].user_id==userId ){
                        const bookObj={
                            "bookId":books[i]._id,
                            "bookimg":books[i].img,
                            "bookname":books[i].name,
                            "bookstate":books[i].reviews[i].state,
                            "bookrate":books[i].reviews[i].rate,
                            "author_Id":books[i].author_id._id,
                            "author_FirstName":books[i].author_id.first_name,
                            "author_last_name":books[i].author_id.last_name,

                        }
                        allbook.push(bookObj);
                    }
                }
        }
        res.json(allbook);
        }
        if(state == 'Read' )
        {
            let readbook=[];
            const books=  await bookModel.find();
            for(let i=0;i<books.length;i++){
                for(let y=0;y<books[i].reviews.length;y++)
                {
                    if(books[i].reviews[y].state=='Read'&& books[i].reviews[y].user_id==userId ){
                        const bookObj={
                            "bookId":books[i]._id,
                            "bookimg":books[i].img,
                            "bookname":books[i].name,
                            "bookstate":books[i].reviews[i].state,
                            "bookrate":books[i].reviews[i].rate,
                            "author_Id":books[i].author_id._id,
                            "author_FirstName":books[i].author_id.first_name,
                            "author_last_name":books[i].author_id.last_name,

                        }
                        readbook.push(bookObj);
                    }
                }
            } 
             res.json(readbook);

        }
        if(state == 'Want to Read' )
        {
            let wantReadbook=[];
            const books=  await bookModel.find();
            for(let i=0;i<books.length;i++){
                for(let y=0;y<books[i].reviews.length;y++)
                {
                    if(books[i].reviews[y].state=='Want to Read'&& books[i].reviews[y].user_id==userId ){
                        const bookObj={
                            "bookId":books[i]._id,
                            "bookimg":books[i].img,
                            "bookname":books[i].name,
                            "bookstate":books[i].reviews[i].state,
                            "bookrate":books[i].reviews[i].rate,
                            "author_Id":books[i].author_id._id,
                            "author_FirstName":books[i].author_id.first_name,
                            "author_last_name":books[i].author_id.last_name,

                        }
                        wantReadbook.push(bookObj);
                    }
                }
            } 
             res.json(wantReadbook);
        }
        if(state == 'currently Read' )
        {
            let currentReadbook=[];
            const books=  await bookModel.find();
            for(let i=0;i<books.length;i++){
                for(let y=0;y<books[i].reviews.length;y++)
                {
                    if(books[i].reviews[y].state=='currently Read'&& books[i].reviews[y].user_id==userId ){
                        const bookObj={
                            "bookId":books[i]._id,
                            "bookimg":books[i].img,
                            "bookname":books[i].name,
                            "bookstate":books[i].reviews[i].state,
                            "bookrate":books[i].reviews[i].rate,
                            "author_Id":books[i].author_id._id,
                            "author_FirstName":books[i].author_id.first_name,
                            "author_last_name":books[i].author_id.last_name,

                        }
                        currentReadbook.push(bookObj);
                    }
                }
            } 
             res.json(currentReadbook);
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;  
        let reqt = {...req.body};
       console.log(reqt);
    //    console.log(id);
        const update = await userBookModel.findOne({ _id:id},{reviews:1,_id:0});
        var item = update.reviews.find(item => item.user_id == req.body.user_id); 
            console.log(item);
        if(item == undefined){
            console.log("i undefined");
            update.reviews.addToSet(reqt);
            const newarr = await bookModel.findByIdAndUpdate(id,update);
            res.send(newarr);                    
        }
        else 
            {
                if(!reqt.state){
                    reqt.state=item.state;
                    console.log("i stateee");
                }
  /*              if(!reqt.rate){
                    reqt.rate=item.rate;
                    console.log("i rateee");
                    
                }
                
                
            */    
console.log(reqt);
                if(reqt.comment == undefined){
                    console.log("i comment");
                    reqt.comment[0]=item.comment;
                }
                
                if(reqt.comment)
                {
                    console.log("i comment");
                    for(let i=0;i<item.comment.length;i++){
                        reqt.comment[i+1]=item.comment[i];
                    }
                }     
                update.reviews.remove(item);
                console.log(update.reviews);

                update.reviews.addToSet(reqt);
                console.log(update.reviews);
                const newarr =await bookModel.findByIdAndUpdate(id,update,{new:true});
                res.send(newarr); 
            }
        }
     catch (err) {
        res.send(err);
       
    }
})
module.exports = router;










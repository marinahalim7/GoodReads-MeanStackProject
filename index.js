const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter=require('./routes/admin/login');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


const authorRouter = require('./routes/admin/author');
const bookRouter = require('./routes/admin/book')
const categoryRoute = require('./routes/admin/cateogry');


app.use(express.json());

// handle image uploads
app.use('/assets',express.static('assets'));

//
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log(`mongoose connected to ${DB_URL}`);
});


// router of admin
app.use('/admin',userRouter);

// router of author
app.use('/admin/author',authorRouter);

// router of book
app.use('/admin/book',bookRouter);

// router of category
app.use('/admin/category',categoryRoute);

mongoose.connection.on('error', err => {
     console.log(err);
  });



app.listen(PORT, (err) => {
    if (!err) return console.log(`server starts at port ${PORT}`)
    return console.log(err);
})


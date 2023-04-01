const express = require('express');
const app = express();
const mongoose = require('mongoose');
const adminRouter=require('./routes/admin/login');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const authorRouter = require('./routes/admin/author');
const bookRouter = require('./routes/admin/book')
const categoryRoute = require('./routes/admin/cateogry');
const userBookRouter = require('./routes/users/userBook');
const authUserRoute = require('./routes/users/authUser');
const cateoriesRoute = require('./routes/users/cateogry');
const authorsRoute = require('./routes/users/author');
const booksRoute = require('./routes/users/book');

const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use('/assets',express.static('assets'));

mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log(`mongoose connected to ${DB_URL}`);
});

app.use('/admin',adminRouter);
app.use('/usersAuth',authUserRoute );
app.use('/admin/author',authorRouter);
app.use('/admin/book',bookRouter);
app.use('/admin/category',categoryRoute);
app.use('/users/userbook',userBookRouter);
app.use('/categories',cateoriesRoute);
app.use('/authors',authorsRoute);
app.use('/books',booksRoute);


mongoose.connection.on('error', err => {
     console.log(err);
  });

app.listen(PORT, (err) => {
    if (!err) return console.log(`server starts at port ${PORT}`)
    return console.log(err);
})


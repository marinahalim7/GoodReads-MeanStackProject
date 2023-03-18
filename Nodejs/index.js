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

const userRouter = require('./routes/users/user');
const userBookRouter = require('./routes/users/userBook');

const authUserRoute = require('./routes/users/authUser');
const cateoriesRoute = require('./routes/users/cateogry');
const authorsRoute = require('./routes/users/author');
const booksRoute = require('./routes/users/book');


const cors=require('cors');
app.use(express.json());
app.use(cors());
//////////////////////////////////////////////////////////////////////// passport
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('./models/User');
// const auth =require('./middleware/authJWT');



// //end point for register
// app.post('/register', async(req, res)=>{
//     try{
//     // distruct specific attr from body
//     const { username, lastname, email, password } = req.body;
    
//     // validate user input when you signUp
//     if(!(email && password && username && lastname)){
//         res.status(400).send("All input is required")
    
//     }
//     // check if user already exist
//     // validate if user exist in our database
//     const oldUSer = await UserModel.findOne({ email });
    
//     if(oldUSer) {
        
//        return res.send(" User Already Exist, Please Login not register")
//     }

//     // now, ther in no user so In need to create user
//      encryptedPassword = await bcrypt.hash(password, 10);

//      const newUser = await UserModel.create({
//         username,
//         lastname,
//         email: email.toLowerCase(),
//         password: encryptedPassword
//          });

//     // create token
//     const token = jwt.sign(
//         {user_id: newUser._id, email},
//         process.env.TOKEN_KEY
//     );

//    // save user token
//    newUser.token = token;
   
//    // return new user
//    res.status(201).json(newUser);
//    console.log(newUser)
//     }
//     catch (err){
//         console.log(err);
//     }

// })


// // end point for login

// app.post('/login', async(req, res)=>{
//     try{
//         // get user input
//         const {email, password } = req.body;
         
//         // validate user input
//         if(!(email && password)){
//             res.status(400).send(" All input is required"); 
//         }
        
//         // validate if user exist in our data base it will check by email
//         const user = await UserModel.findOne({ email });
        
//         // if user have value and check passwor that we inside it as the same password that exist in database
//         if(user && (await bcrypt.compare(password, user.password))){
//             // create token
//             const token = jwt.sign(
//                 { user_id: user._id, email},
//                 process.env.TOKEN_KEY);
    
//                 // save user token
//                 user.token = token;
//                console.log(token)
//                 // user
//                 return res.status(200).json(user);
//         }
//         return res.status(400).send(" Invalid Credentials");
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
//     })
    

// // request and route for welcome
// app.use('/welcome', auth, (req, res)=>{
//     console.log(req.user)
//     res.status(200).send("Welcome");
// });


/////////////////////////////////////////////////////////////////////////////


// handle image uploads
app.use('/assets',express.static('assets'));



mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log(`mongoose connected to ${DB_URL}`);
});


// router of admin
app.use('/admin',adminRouter);

// router of Auth of user
app.use('/usersAuth',authUserRoute );

// router of author
app.use('/admin/author',authorRouter);

// router of book
app.use('/admin/book',bookRouter);

// router of category
app.use('/admin/category',categoryRoute);

//router of user home
app.use('/users/user',userRouter);

//router of user book
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


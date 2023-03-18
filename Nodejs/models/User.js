const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const object_id = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'username is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
       type:String,
       required: [true],
       match: /.+\@.+\..+/,
       unique : [true,"email must be unique"]},
    isAdmin:{
        type:Boolean,
        default: false
    },
    img:{
        type:String
    },
    booksOfUSer_id:[
        {
            type:object_id,ref:"books"
        }
    ],
    token:{type:String}
})

// User.path('email').validate(async function validateDuplicatedEmail(value) {
//     if (!this.isNew && !this.isModified('email')) return true;

//     try {
//         const User = mongoose.model("User");

//         const count = await User.countDocuments({ email: value });
//         if (count > 0) return false;

//         return true;
//     }
//     catch (error) {
//         return false;
//     }
// }, "Email already exists");


User.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User', User)

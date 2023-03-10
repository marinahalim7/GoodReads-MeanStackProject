const mongoose = require('mongoose');
const validator = require('validator');
const object_id = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true 
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    isAdmin:{
        type:Boolean,
        default: false 
    },
    token: { type: String },
    booksOfUSer_id:[
        {
            type:object_id,ref:"books"
        }
    ]
})


const userModel = mongoose.model('users',userSchema);
module.exports = userModel;
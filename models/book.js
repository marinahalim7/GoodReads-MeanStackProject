const mongoose = require('mongoose');
const object_Id = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    img: { type: String, default:""},
    name: { type: String, required: true },

    author_id: { type: object_Id, ref: "authors" },
    category_id: { type: object_Id, ref: "categories" },
    reviews:[{
        user_id:{type:object_Id,ref:"users"},
        rate:{type:Number},
        comment:{type:String},
        state:{type:String,
        enum:['currently Read','Want to Read','Read']}
    }]
})

const bookModel= mongoose.model('books',bookSchema);
module.exports=bookModel;
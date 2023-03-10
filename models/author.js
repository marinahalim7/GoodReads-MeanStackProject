const mongoose = require("mongoose");
const object_Id = mongoose.Schema.Types.ObjectId

const authorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    Date_of_birth: { type: Date, default: null },
    img: { 
     type: String
    },
    booksOfAuth_id: [{ type:object_Id, ref: 'books'}]
})

const authorModel = mongoose.model('authors', authorSchema);
module.exports = authorModel;
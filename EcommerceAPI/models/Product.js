const mongoose = require("mongoose");
 

const productSchema = new mongoose.Schema({
    title : {type: String , required:true},
    description : {type: String , required:true},
    img : {type: String , required:true},
    size : {type: String },
    color : {type: String },
    price : {type: Number , required:true},
    contactno : {type: Number , required:true},
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Reference to Category
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
     
},{
    timestamps:true
})
module.exports = mongoose.model("Product",productSchema);
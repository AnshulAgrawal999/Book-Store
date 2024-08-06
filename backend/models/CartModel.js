const mongoose = require( 'mongoose' )  ;

const cartSchema = mongoose.Schema(
{   
    bookimage : { type : String , required : true },
    booktitle : { type : String , required : true },
    bookprize : { type: String , required : true },
    bookauthor: { type: String, required : true },
    bookdescription : { type: String, required : true },
    useremail : { type: String , required : true }
},
{
    versionKey : false
}
)

const CartModel = mongoose.model( "cart" , cartSchema )  ;


module.exports = { CartModel } ;
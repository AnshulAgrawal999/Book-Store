const mongoose = require( 'mongoose' )  ;

const cartSchema = mongoose.Schema(
{   
    image : { type : String , required : true },
    title : { type : String , required : true },
    prize : { type: String , required : true },
    author: { type: String, required : true },
    description : { type: String, required : true },
    email : { type: String , required : true }
},
{
    versionKey : false
}
)

const CartModel = mongoose.model( "cart" , cartSchema )  ;


module.exports = { CartModel } ;
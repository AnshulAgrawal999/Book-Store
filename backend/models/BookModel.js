const mongoose = require( 'mongoose' )  ;

const bookSchema = mongoose.Schema(
{
    image : { type : String , required : true },
    title : { type : String , required : true },
    prize : { type: String , required : true },
    author: { type: String, required : true },
    description : { type: String, required : true }
}
)

const BookModel = mongoose.model( "book" , bookSchema )  ;

module.exports = { BookModel } ;
const mongoose = require( 'mongoose' )  ;

const bookSchema = mongoose.Schema(
{
    bookimage : { type : String , required : true },
    booktitle : { type : String , required : true },
    bookprize : { type: String , required : true },
    bookauthor: { type: String, required : true },
    bookdescription : { type: String, required : true },
    authoremail : { type: String , required : true }
}
)

const BookModel = mongoose.model( "book" , bookSchema )  ;

module.exports = { BookModel } ;
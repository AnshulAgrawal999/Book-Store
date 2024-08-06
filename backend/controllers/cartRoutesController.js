const { CartModel } = require( '../models/CartModel' )  ;


const getCart = async ( req , res ) => {
    try {

        const { useremail } = req.body  ;

        const books = await CartModel.find( { useremail } )  ;

        res.status(200).send( books )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    } 
}

const addBookInCart = async ( req , res )=>{

    try {
        
        const book = new CartModel( req.body )  ;

        await book.save()  ;

        res.status(201).send( { "msg":"Product added" , book } )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
}

const updateBookInCart = async ( req , res )=>{

    try {

        const id = req.params.id  ; 

        await CartModel.updateOne( { 'useremail' : req.body.useremail , '_id' : id } , req.body )  ;

        res.status(201).send( {"msg":"Product has been updated"} )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
}

const deleteBookInCart = async ( req , res )=>{
    
    try {
        const id = req.params.id  ; 

        await CartModel.deleteOne( { 'useremail' : req.body.useremail , '_id' : id } )  ;

        res.status(200).send( {"msg":"Product has been deleted"} )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
} 


module.exports = { getCart , addBookInCart , updateBookInCart , deleteBookInCart }  ;
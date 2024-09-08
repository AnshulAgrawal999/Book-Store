const { CartModel } = require( '../models/CartModel' )  ;


const getCart = async ( req , res ) => {
    try {

        const { useremail } = req.body  ;

        const books = await CartModel.find( { useremail } )  ;

        res.status(200).send( books )  ;

    } catch (error) {
        res.status(400).send( { error } )  ;
    } 
}

const addBookInCart = async ( req , res )=>{

    try {

        const { booktitle , bookauthor , useremail } = req.body  ;

        const book = await CartModel.findOne( { booktitle , bookauthor , useremail } )  ;

        if( !book )
        {
            const newbook = new CartModel( req.body )  ;

            newbook.number = 1  ;

            await newbook.save()  ;

            res.status(201).send( { "msg" : "Book added to cart" , newbook } )  ;
        }
        else
        {
            res.status(200).send( { "msg" : "Book is already present in cart" } )  ;
        }    
        
    } catch (error) {
        res.status(400).send( { error } )  ;
    }
}

const updateBookInCart = async ( req , res )=>{

    try {

        const { booktitle , bookauthor , useremail } = req.body  ;

        const book = await CartModel.updateOne( { booktitle , bookauthor , useremail } , req.body )  ;

        res.status(200).send( { "msg" : "Book has been updated" , book } )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
}

const removeBookFromCart = async ( req , res )=>{
    
    try {
        
        const { booktitle , bookauthor , useremail } = req.body  ;

        const book = await CartModel.deleteOne( { booktitle , bookauthor , useremail } )  ;

        res.status(200).send( { "msg" : "Book removed from cart" , book } )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
} 

const emptyCart = async ( req , res )=>{
    
    try {
        
        const { useremail } = req.body  ;

        const books = await CartModel.deleteMany( { useremail } )  ;

        res.status(200).send( { "msg" : "Empty Cart" , books } )  ;

    } catch (error) {
        res.status(400).send( {error} )  ;
    }
} 


module.exports = { getCart , addBookInCart , updateBookInCart , removeBookFromCart , emptyCart }  ;
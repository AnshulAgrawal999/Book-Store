const express = require( 'express' )  ;


const { getCart , addBookInCart , updateBookInCart , deleteBookInCart } = require( '../controllers/cartRoutesController' )  ;

const { auth } = require( '../middleware/auth' )  ;


const cartRouter = express.Router()  ;


cartRouter.post( '/' , auth , getCart )  ;

cartRouter.post( '/add' , auth , addBookInCart )  ;

cartRouter.patch( '/update' , auth , updateBookInCart )  ;

cartRouter.delete( '/delete' , auth , deleteBookInCart )  ;


module.exports = { cartRouter }  ;
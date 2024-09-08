const express = require( 'express' )  ;


const { getCart , addBookInCart , updateBookInCart , removeBookFromCart , emptyCart } = require( '../controllers/cartRoutesController' )  ;

const { auth } = require( '../middleware/auth' )  ;


const cartRouter = express.Router()  ;


cartRouter.post( '/get' , auth , getCart )  ;

cartRouter.post( '/addbook' , auth , addBookInCart )  ;

cartRouter.patch( '/updatebook' , auth , updateBookInCart )  ;

cartRouter.delete( '/removebook' , auth , removeBookFromCart )  ;

cartRouter.delete( '/empty' , auth , emptyCart )  ;

module.exports = { cartRouter }  ;
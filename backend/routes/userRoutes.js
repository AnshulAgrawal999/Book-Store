const express = require( 'express' )  ;

const { auth } = require( '../middleware/auth' )  ;


const { registerUser , loginUser , logoutUser , refreshToken , deleteUser } = require( '../controllers/userRoutesController' )  ;


const userRouter = express.Router()  ;

userRouter.post( '/register' , registerUser )  ;

userRouter.post( '/login' , loginUser )  ;

userRouter.post( '/logout' , logoutUser )   ;

userRouter.delete( '/delete' , auth , deleteUser )  ;

userRouter.get( '/refreshtoken' , refreshToken )  ;



module.exports = { userRouter }  ;
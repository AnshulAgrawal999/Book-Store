const express = require( 'express' )  ;

const { passwordCheck } = require( '../middleware/validate' )  ;


const { registerUser , loginUser , logoutUser , refreshToken , deleteUser } = require( '../controllers/userRoutesController' )  ;


const userRouter = express.Router()  ;

userRouter.post( '/register' , passwordCheck , registerUser )  ;

userRouter.post( '/login' , loginUser )  ;

userRouter.post( '/logout' , logoutUser )   ;

userRouter.delete( '/account/delete' , deleteUser )  ;

userRouter.get( '/refreshtoken' , refreshToken )  ;



module.exports = { userRouter }  ;
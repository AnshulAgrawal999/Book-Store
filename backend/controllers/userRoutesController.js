const bcrypt = require( 'bcrypt' ) ;

const jwt  = require( 'jsonwebtoken' )  ;

const dotenv = require( 'dotenv' )  ;


const { UserModel } = require( '../models/UserModel' )  ;

const { BlackListModel } = require( '../models/BlackListModel' )  ;


dotenv.config()  ;



const registerUser = async ( req , res ) => {

    try {

        const { useremail , userpassword } = req.body  ;

        const user = await UserModel.findOne( { useremail } )  ;

        if( !user )
        {   
            bcrypt.hash( userpassword , 3 , async function(err, hash) {
                if( err )
                {
                    res.status(200).send( { "error" : err } )  ;
                }
                else
                {
                    const newuser = new UserModel( req.body )  ;

                    newuser.userpassword = hash  ;

                    await newuser.save()  ;

                    res.status(201).send( { "msg" : "Account Created!", newuser } )  ;
                }
            })  ;
        }
        else
        {
            res.status(200).send( { "msg" : "Account with this email already present!" } )  ;
        }
        
    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
}

const loginUser = async ( req , res )=>{

    try {
        const { useremail , userpassword  } = req.body  ;

        const user = await UserModel.findOne( { useremail } )  ;

        if( user )
        {
            bcrypt.compare( userpassword , user.userpassword , function(err, result) {
                if( err )
                {
                    res.status(200).send( { "error" : err } )  ;
                }

                if( result )
                {
                    const accessToken = jwt.sign( { useremail } , process.env.accessSecretKey , { expiresIn: '60m' } )  ;

                    const refreshToken = jwt.sign( { useremail } , process.env.refreshSecretKey , { expiresIn: '1d' } )  ;

                    res.status(200).send( { "msg" :"Login successful!" , accessToken , refreshToken } )  ;
                }
                else
                {
                    res.status(200).send( { "msg" : "Incorrect password!" } )  ;
                }
            });
        }
        else
        {
            res.status(200).send( { "msg" : "No user account found with this email" } )  ;
        }

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const logoutUser = async ( req , res ) => {
    try {
        const { accessToken , refreshToken } = req.body  ;

        await BlackListModel.insertMany( [ { "token" : accessToken } , { "token" : refreshToken } ] )  ;

        res.status(200).send( {"msg":"User has been logged out" }  )  ;
        
    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const changePassword = async ( req , res ) => {
    try {
        const { useremail , olduserpassword , newuserpassword , accessToken , refreshToken } = req.body  ;

        const user = await UserModel.findOne( { useremail } )  ;

        if( user )
        {
            bcrypt.compare( olduserpassword , user.userpassword , async function(err, result) {
                if( err )
                {
                    res.status(200).send( { "error" : err } )  ;
                }

                if( result )
                {
                    await BlackListModel.insertMany( [ { "token" : accessToken } , { "token" : refreshToken } ] )  ;

                    await UserModel.updateOne( { 'useremail' : useremail } , { 'userpassword' : newuserpassword } )  ;

                    res.status(200).send( { "msg" : "Password has been updated! User logged out" }  )  ;
                }
                else
                {
                    res.status(200).send( { "msg" : "Incorrect password" } )  ;
                }
            })  ;
        }
        else
        {
            res.status(200).send( { "msg" : "Incorrect email" } )  ;
        }

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const deleteUser = async ( req , res ) => {
    
    try {
        const { useremail , userpassword , accessToken , refreshToken } = req.body  ;

        const user = await UserModel.findOne( { useremail } )  ;

        if( user )
        {
            bcrypt.compare( userpassword , user.userpassword , async function(err, result) {
                if( err )
                {
                    res.status(200).send( { "error" : err } )  ;
                }

                if( result )
                {
                    await BlackListModel.insertMany( [ { "token" : accessToken } , { "token" : refreshToken } ] )  ;
                    
                    await UserModel.deleteOne( { 'useremail' : useremail } )  ;

                    res.status(200).send( { "msg" : "Accout has been deleted" , user }  )  ;
                }
                else
                {
                    res.status(200).send( { "msg" : "Incorrect password" } )  ;
                }
            })  ;
        }
        else
        {
            res.status(200).send( { "msg" : "Incorrect email" } )  ;
        }

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const refreshToken = async ( req , res ) => {

    try {

        const { accessToken , refreshToken } = req.body  ;

        const item1 = await BlackListModel.findOne( { "token" : accessToken } )  ;

        const item2 = await BlackListModel.findOne( { "token" : refreshToken } )  ;

        if ( item1 && !item2 )
        {
            jwt.verify( refreshToken , process.env.refreshSecretKey , function( err , decoded ) 
            {
                if ( !err )
                {
                    const newaccessToken = jwt.sign( { 'useremail' : decoded.useremail } , process.env.accessSecretKey , { expiresIn: '60m' } )   ;
    
                    res.status(200).send( { "newaccessToken" : newaccessToken } )  ;
                }
                else
                {
                    res.status(200).send( { "error" : err } )  ;
                }
            });
        }
        else
        {
            res.status(200).send( { "msg" : "You are not logged in" } )  ;
        } 

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
}


module.exports = { registerUser , loginUser , logoutUser , changePassword ,deleteUser , refreshToken }  ;
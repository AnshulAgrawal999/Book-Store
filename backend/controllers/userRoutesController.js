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
            if ( userpassword.length > 7 && (/\d/.test(userpassword) )) 
            {
                bcrypt.hash( userpassword , 5 , async function(err, hash) {
                    if( err )
                    {
                        res.send( { "error" : err } )  ;
                    }
                    else
                    {
                        const newuser = new UserModel( req.body )  ;

                        newuser.userpassword = hash  ;

                        await newuser.save()  ;

                        res.status(200).send( { "msg" : "The new user has been registered", newuser } )  ;
                    }
                })  ;
            }
            else
            {
                res.send( { "msg" : "password should be at least 8 characters long and contain one number" } )  ;
            }
        }
        else
        {
            res.send( { "msg" : "Email is already registered, go to login" } )  ;
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
                    res.send( { "error" : err } )  ;
                }

                if( result )
                {
                    const accessToken = jwt.sign( { useremail } , process.env.accessSecretKey , { expiresIn: '60m' } )  ;

                    const refreshToken = jwt.sign( { useremail } , process.env.refreshSecretKey , { expiresIn: '1d' } )  ;

                    res.status(200).send( {"msg":"Login successful!", accessToken , refreshToken } )  ;
                }
                else
                {
                    res.send( { "msg" : "Password is incorrect" } )  ;
                }
            });
        }
        else
        {
            res.send( { "msg" : "Email is incorrect" } )  ;
        }

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const logoutUser = async ( req , res ) => {
    try {
        const accessToken = req.body.accessToken  ;

        const refreshToken = req.body.refreshToken  ;

        await BlackListModel.insertMany( [ { "token" : accessToken } , { "token" : refreshToken } ] )  ;

        res.status(200).send( {"msg":"User has been logged out" }  )  ;
        
    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
} 

const refreshToken = async ( req , res ) => {

    try {

        const refreshToken = req.headers.authorization  ;

        const item = await BlackListModel.findOne( { "token" : refreshToken } )  ;

        if ( !item )
        {
            jwt.verify( refreshToken , process.env.refreshSecretKey , function(err, decoded) 
            {
                if ( !err )
                {
                    const newaccessToken = jwt.sign( { 'useremail' : decoded.useremail } , process.env.accessSecretKey , { expiresIn: '60m' } )   ;
    
                    res.status(200).send({ "newaccessToken" : newaccessToken })  ;
                }
                else
                {
                    res.send( { "error" : err } )  ;
                }
            });
        }
        else
        {
            res.send( { "msg" : "Your are not logged in" } )  ;
        } 

    } catch (error) {
        res.status(400).send( { "error" : error } )  ;
    }
}


module.exports = { registerUser , loginUser , logoutUser , refreshToken }  ;
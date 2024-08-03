const express = require( 'express' )  ;

const dotenv = require( 'dotenv' )  ;

dotenv.config()  ;

const cors = require( 'cors' )  ;

const { connection } = require( './configs/db' )  ;

const PORT = process.env.PORT || 6000  ;

const app = express()  ;

app.use( cors() )  ;

app.use( express.json() )  ;

app.get( '/' , ( req , res ) => {

    res.send( { 'msg' : 'this is Book-Store home page' } )  ;
    
} )  ;


app.listen( PORT , async ()=>{
    try {
        console.log( `server is running on http://localhost:${PORT}` )  ;
        
        await connection  ;

        console.log( 'server is connected to DB' )  ;

    } catch (error) {
        
        console.log( { error } )  ;
    }
} )  ;
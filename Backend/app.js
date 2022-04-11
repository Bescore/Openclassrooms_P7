const express = require( 'express' );
const app = express();
const elementRoutes = require( './routes/elements_route' );
const userRoutes = require( './routes/user_route' )
const path = require( 'path' );
const bodyParser = require( 'body-parser' )
const helmet = require( "helmet" );
const rateLimit = require( "express-rate-limit" );//anti ddos

//sécurité helmet//
app.use( helmet() );

//sécurité cors abaissée//
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );

//anti ddos/limiter//
const limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500 // limit each IP to 100 requests per windowMs
} );
//  apply to all requests
app.use( limiter );

//body parser pour traiter les objets//
app.use( bodyParser.json() );


//ligne lié à multer, va servir le dossier indiqué//
app.use( "/image", express.static( path.join( __dirname, 'image' ) ) );

app.use( '/', elementRoutes );
app.use( '/auth', userRoutes );

module.exports = app;
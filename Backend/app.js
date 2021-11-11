const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const userRoutes = require( './routes/user_r' );
const elementRoutes =require('./routes/Element')

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );
app.use( bodyParser.json() );





app.use( '/', elementRoutes );
app.use( '/user', userRoutes );


module.exports = app;





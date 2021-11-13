const express = require( 'express' );
const app = express();
const elementRoutes = require( './routes/elements_route' );
const userRoutes=require('./routes/user_route')







app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );

app.use( express.json() );

app.use( '/', elementRoutes );
app.use( '/auth',userRoutes );
module.exports = app;
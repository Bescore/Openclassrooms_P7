const express = require( 'express' );
const con=require('./mysql/db')

const app = express();

app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );


app.use( '/api/stuff', ( req, res, next ) => {
      con.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [ 'jm@live.fr' ],
        function ( err, results ) {

            res.status(200).json( results[ 0 ].prenom  )

        } )
    
} );








module.exports = app;
const express = require( 'express' );
const con=require('./mysql/db')
const app = express();
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );

app.use( express.json() );
//route des commentaires du post//
app.use( '/feed/posters', ( req, res, next ) => {
    
      con.query(
        'SELECT * FROM comments ',
        
          function ( err, results ) {
              if ( err ) {
                  console.log( 'Erreur sur la route des commentaires du post' );
              }

            res.status( 200 ).json( results )
            

        } )
} );


app.use( '/feed/post', ( req, res, next ) => {

    con.query(
        'SELECT * FROM posts ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des posts' );
            }

            res.status( 200 ).json( results )


        } )

} );






module.exports = app;
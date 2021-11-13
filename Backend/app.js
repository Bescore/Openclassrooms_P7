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

app.use( '/feed/like', ( req, res, next ) => {

    con.query(
        'SELECT * FROM likes ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des likes' );
            }

            res.status( 200 ).json( results )


        } )

} );

app.post( '/feed/comment', ( req, res, next ) => {

    con.query(
        `INSERT INTO comments(commentaires) VALUES ("${ req.body.commentaire }")`,

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

} );


app.post( '/feed/reagir', ( req, res, next ) => {

    con.query(
        `INSERT INTO posts(post_body,post_img,titre) VALUES ("${ req.body.post_body }","${ req.body.post_image }","${ req.body.post_title }")`,

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

} );


module.exports = app;
const express = require( 'express' );
const router = express.Router();
const con = require( '../mysql/db' )

//route des commentaires du post//
router.use( '/feed/posters', ( req, res, next ) => {

    con.query(
        'SELECT * FROM comments ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des commentaires du post' );
            }

            res.status( 200 ).json( results )


        } )
} );


router.use( '/feed/post', ( req, res, next ) => {

    con.query(
        'SELECT * FROM posts ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des posts' );
            }

            res.status( 200 ).json( results )


        } )

} );

router.use( '/feed/like', ( req, res, next ) => {

    con.query(
        'SELECT * FROM likes ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des likes' );
            }

            res.status( 200 ).json( results )


        } )

} );

router.post( '/feed/comment', ( req, res, next ) => {

    con.query(
        `INSERT INTO comments(commentaires) VALUES ("${ req.body.commentaire }")`,

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

} );


router.post( '/feed/reagir', ( req, res, next ) => {

    con.query(
        `INSERT INTO posts(post_body,post_img,titre) VALUES ("${ req.body.post_body }","${ req.body.post_image }","${ req.body.post_title }")`,

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

} );


module.exports = router;
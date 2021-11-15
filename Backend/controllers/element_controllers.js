const con = require( '../mysql/db' )
const multer = require( '../multer/multer-config' )
exports.userPosts = ( req, res, next ) => {

    con.query(
        'SELECT * FROM posts ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des posts' );
            }

            res.status( 200 ).json( results )


        } )

}


exports.userComments = ( req, res, next ) => {

    con.query(
        'SELECT * FROM comments ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des commentaires du post' );
            }

            res.status( 200 ).json( results )


        } )
}


exports.userLikes = ( req, res, next ) => {

    con.query(
        'SELECT * FROM likes ',

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des likes' );
            }

            res.status( 200 ).json( results )


        } )

}

exports.addcomment = ( req, res, next ) => {

    con.query(
        `INSERT INTO comments(commentaires) VALUES ("${ req.body.commentaire }")`,

        function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

}

exports.addPosts = ( req, res, next ) => {
    console.log( req.body )

    req.body.post_image = `${ req.protocol }://${ req.get( 'host' ) }/image/${ req.file.filename }`

    con.query(
        `INSERT INTO posts(post_body,post_img,titre) VALUES ("${ req.body.post_body }","${ req.body.post_image }","${ req.body.titre }")`, function ( err, results ) {
            if ( err ) {
                console.log( 'Erreur sur la route des comments' );
            }

            res.status( 200 ).json( results )


        } )

}
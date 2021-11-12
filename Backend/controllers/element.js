const con = require( './mysql/db' )

app.use( '/api/stuff', ( req, res, next ) => {
    con.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [ 'jm@live.fr' ],
        function ( err, results ) {

            res.status( 200 ).json( results[ 0 ].prenom )

        } )

} );
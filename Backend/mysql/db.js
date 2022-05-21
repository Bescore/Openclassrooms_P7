const mysql = require( 'mysql2' );


const con = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'carnibarge97',
    database: 'projet7_op',
} );

con.connect( ( err ) => {
    if ( err ) {
        console.log( 'Erreur de connection à la base de donnée !' );
        return;
    }
    console.log( 'Base de donnée connectée !' );
} );

/*EXEMPLE D'UTILISATION DES QUERY ET MANIPULATION
const kiki = con.query(
    'SELECT * FROM utilisateurs WHERE email = ?',
    [ 'jm@live.fr' ],
    function ( err, results ) {
        
        console.log( JSON.stringify( results[ 0 ].md_passe ) )
      
    }
);*/


/*EXEMPLE DE FONCTION QUI AFFICHE LA BASE DEPUIS NODE.JS

app.use( '/api/stuff', ( req, res, next ) => {
      con.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [ 'jm@live.fr' ],
        function ( err, results ) {

            res.status(200).json( results[ 0 ].prenom  )

        } )

} );*/




module.exports = con;
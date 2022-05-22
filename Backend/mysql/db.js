const mysql = require( 'mysql2' );


const con = mysql.createConnection( {
    host: process.env.HOST_SQL,
    user: process.env.USERNAME_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.DB_NAME,
} );

con.connect( ( err ) => {
    if ( err ) {
        console.log( 'Erreur de connection à la base de donnée !' );
        return;
    }
    console.log( 'Base de donnée connectée !' );
} );
setInterval(function () {
    con.query( 'SELECT 1' );
}, 5000);

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
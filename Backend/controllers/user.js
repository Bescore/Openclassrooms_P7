const bcrypt=require('bcrypt');
const con = require( '../mysql/Element' );

con.connect( ( err ) => {
    if ( err ) {
        console.log( 'Error connecting to Db' );
        return;
    }
    console.log( 'Connection established' );
} );



exports.signup = ( req, res, next ) => {
    bcrypt.hash( req.body.password, 10 )
        .then( hash => {
            con.query( `INSERT INTO utilisateurs(nom,prenom,md_passe,email) VALUES('${ req.body.nom }','${ req.body.prenom }','${ hash }','${ req.body.email }')`, ( err, result ) => {
                if ( err ) throw err, console.log( 'Insert into a pas fonctionné');
                res.status( 201 ).json( { message: "l'utilisateur a bien été crée et est enregistré dans la base de donnée" } )
                console.log( 'données de la base sql:' );
                console.log( result );

            } );
            con.end();
        } )
        .catch( error => error, res.status( 200 ).json( { message: ' ceci est le catch de le fonction signup' } ) );
};

exports.login = ( req, res, next ) => {
    const email=`email`
    con.query( `SELECT ${email}  FROM utilisateurs WHERE email=${ req.body.email}` ), ( err, result ) => {
        if ( err ) throw err, console.log( 'erreur a la fonction login au niveau du query' );
        if ( result === null || result === 0 ) {
            return res.status(401).json({error:'accès non autorisé'})
        }
        console.log( result )
    }
};










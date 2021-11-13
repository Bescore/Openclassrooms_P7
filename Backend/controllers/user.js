const bcrypt=require('bcrypt')
const con = require( '../mysql/db' )

//creation d'utilisateur//
exports.signup = async( req, res, next ) => {
    const hashy = await bcrypt.hash( req.body.password, 10 )
    con.query( `INSERT INTO utilisateurs(nom,prenom,md_passe,email) VALUES("${ req.body.nom }","${ req.body.prenom }","${hashy}","${ req.body.email }")`, function( err, result ) {
        res.status( 200 ).json( { message: "l'utilisateur a bien été crée et est enregistré dans la base de donnée" } )
        console.log( result);

    } );
};


exports.login = ( req, res, next ) => {
    const mdp = `md_passe`
    const email = `email`
    con.query( `SELECT ${ email }  FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, result ) {
        if ( err ) throw err, console.log( 'erreur a la fonction login au niveau du query' );
        res.status( 200 ).json( result )
        
        const hashed = con.query( `SELECT ${ mdp }  FROM utilisateurs WHERE md_passe='${ req.body.password }'`, ( err, result ) => {
            if ( result === null || result === 0 ) {
                return res.status( 201 ).json( { error: 'mdp non présent dans la base' } )
            }
            res.status( 200 ).json( result)
        } )


        bcrypt.compare( req.body.password, hashed )
            .then( valid => {
                if ( !valid ) {
                    return res.status( 401 ).json( { error: 'mot de passe incorrecte' } );
                }
                res.status( 200 ).json( {
                    idutilisateurs: con.query( `SELECT idutilisateurs  FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, result ) {
                        if ( err ) throw err, console.log( 'erreur a la fonction login au niveau du query' );
                        return res.status( 200 ).json( result )
                    } ),
                    token:'TOKEN',
                })
            })
            .catch( error => error, res.status( 500 ).json( { message: ' ceci est le catch de le fonction signup' } ));
    } )
    
}


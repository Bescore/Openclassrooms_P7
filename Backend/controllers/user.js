const bcrypt = require( 'bcrypt' );
const con = require( '../mysql/db' )
const jwt = require( 'jsonwebtoken' )

//CREATION D'UTILISATEUR//
exports.signup = async ( req, res, next ) => {
    const hashy = await bcrypt.hash( req.body.password, 10 )
    const photo =`${ req.protocol }://${ req.get( 'host' ) }/image/user-icon.png`
    con.query( `INSERT INTO utilisateurs(nom,prenom,md_passe,email,photo) VALUES("${ req.body.nom }","${ req.body.prenom }","${ hashy }","${ req.body.email }","${photo}")`, function ( err, result ) {

        console.log( req.body );
    } );
    con.query( `SELECT idutilisateurs FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, result ) {
        if ( err ) {
            console.log( 'Erreur sur 1 la route de login' )
        }
        res.status( 200 ).json( {
            userId: result
        } )
       } )
};

//LOGIN, CONTRÔLE D'ACCÈS UTILISATEUR//
exports.login = ( req, res, next ) => {

    con.query( `SELECT idutilisateurs FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, resultat ) {
        if ( err ) {
            console.log( 'Erreur sur 1 la route de login' )
        }
        
        con.query( `SELECT md_passe FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, resulting ) {
            if ( err ) {
                console.log( 'Erreur 2 sur la route de login' )
            }
            const idUser = resultat[ 0 ].idutilisateurs
            const hashedPassw = resulting[ 0 ].md_passe
            bcrypt.compare( req.body.password, hashedPassw )
                .then( valid => validate( valid ) )

            const validate = ( valid ) => {
                if ( valid ) {
                    res.status( 200 ).json( {
                        token: jwt.sign(
                            { userId: idUser }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' }
                        ),
                        userId: idUser
                    } )
                } else {
                    res.status( 400 ).json( 'mauvais mot de passe' )
                }
            }
        } );
    } ); 
}



const bcrypt=require('bcrypt');
const con = require( '../mysql/db' )

//creation d'utilisateur//
exports.signup = async( req, res, next ) => {
    const hashy = await bcrypt.hash( req.body.password, 10 )
    con.query( `INSERT INTO utilisateurs(nom,prenom,md_passe,email) VALUES("${ req.body.nom }","${ req.body.prenom }","${hashy}","${ req.body.email }")`, function( err, result ) {
        res.status( 200 ).json( { message: "l'utilisateur a bien été crée et est enregistré dans la base de donnée" } )
        console.log( req.body);
    } );
};


exports.login = ( req, res, next ) => {
    con.query( `SELECT idutilisateurs FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, resultat ) {
        if ( err ) {
            console.log( 'Erreur sur la route de login' )  
        }
         
        con.query( `SELECT md_passe FROM utilisateurs WHERE email='${ req.body.email }'`, function ( err, resulting ) {
            if ( err ) {
                console.log( 'Erreur sur la route de login' )
            }
        const gangst= resultat[ 0 ].idutilisateurs 
        const kakala = resulting[ 0 ].md_passe
        bcrypt.compare( req.body.password, kakala )
            .then(valid=>validate(valid))
        
        const validate = ( valid ) => {
            if ( valid == true ) {
                res.status( 200 ).json( {
                    token: 'TOKEN DE LA MOWWW',
                    userId:gangst
                 } )
            }
        }
        } );
    } );
        
        
}



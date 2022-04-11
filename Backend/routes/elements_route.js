const express = require( 'express' );
const router = express.Router();
const elementCtrl = require( '../controllers/element_controllers' );
const multer = require( '../multer/multer-config' )
const authentification = require( '../middleware/auth' )





//route d'affichage des commentaires du post//
router.get( '/feed/posters', authentification, elementCtrl.userComments );

//route d'affichage des posts//
router.get( '/feed/post', authentification, elementCtrl.userPosts );

//route d'affichage des infos utilisateurs//
router.post( '/user', authentification, elementCtrl.userAccount );

//route d'ajout de commentaires//
router.post( '/feed/comment', authentification, elementCtrl.addcomment );

//route d'ajout de posts//
router.post( '/image', authentification, multer, elementCtrl.addPosts );

//route de modification d'image page (compte)//
router.put( '/compte', authentification, multer, elementCtrl.changeImage );

//route de modification du nom prénom email//
router.put( '/compte/changes', authentification, elementCtrl.changeMyInfos );

//route de suppression du post utilisateur//
router.delete( '/feed/delete', authentification, elementCtrl.deletePost )

//route de desactivation du compte//
router.put( '/compte/inactive', authentification, elementCtrl.deSactivate )

//route de suppression de post admin//
router.delete( '/feed/admin/delete', authentification, elementCtrl.adminDeletepost )

//route de suppression de commentaire admin//
router.delete( '/feed/admin/del_comment', authentification, elementCtrl.adminDeletecomment )

//route d'activation ou desactivation du compte utilisateur par l'admin//
router.put( '/feed/admin/mod', authentification, elementCtrl.adminInactivation )

//route des utilisateurs sidebar actif//
router.get( '/feed/user_list', authentification, elementCtrl.getAllusers );

//route des utilisateur sidebar inactif
router.get( '/feed/user_list/inactive', authentification, elementCtrl.getAllusersinactive )

//route de verification de validité du token//
router.post( '/feed/connect_verify', elementCtrl.verifyToken );
module.exports = router;
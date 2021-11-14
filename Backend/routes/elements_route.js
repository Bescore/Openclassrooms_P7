const express = require( 'express' );
const router = express.Router();
const con = require( '../mysql/db' )
const elementCtrl = require( '../controllers/element_controllers' );






//route des commentaires du post//
router.get( '/feed/posters', elementCtrl.userComments );

//route d'affichage des posts//
router.get( '/feed/post', elementCtrl.userPosts );

//route des tableaux des likes//
router.get( '/feed/like', elementCtrl.userLikes );

//route d'ajout de commentaires//
router.post( '/feed/comment', elementCtrl.addcomment );

//route d'ajout de posts//
router.post( '/feed/reagir', elementCtrl.addPosts );


module.exports = router;
const express = require('express');
const router = express.Router();

// Appel des paramètres d'authentification de l'utilisateur
const auth = require('../middleware/auth');
// Appel de la fonctionnalité de gérer-stocker les images
const multer = require('../middleware/multer-config');

// Appel des fonctions prévues sur les sauces et de son modèle-type
const sauceCtrl = require('../controllers/sauce');
const sauce = require('../models/sauce');

//- Créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
//- Voir toutes les sauces 
router.get('/', auth, sauceCtrl.getAllSauces);
//- Voir une sauce en détails 
router.get('/:id', auth, sauceCtrl.getOneSauce);
//- Supprimer une sauce 
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//- Modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//-Liker ou disliker une sauce
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);

module.exports = router;
const express = require('express');
const router = express.Router();

// Appel des paramètres d'authentification de l'utilisateur
const auth = require('../middleware/auth');
// Appel de la fonctionnalité de gérer-stocker les images
const multer = require('../middleware/multer-config');

// Appel des actions sur les sauces
const sauceCtrl = require('../controllers/sauce');

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

module.exports = router;
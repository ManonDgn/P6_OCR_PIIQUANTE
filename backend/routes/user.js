const express = require('express');
// Importation du middleware password-validator
const password = require('../middleware/password');

const router = express.Router();


// Appel des actions possibles par l'utilisateur
const userCtrl = require('../controllers/user');

//- Inscription
router.post('/signup', password, userCtrl.signup);
//- Connexion
router.post('/login', userCtrl.login);

module.exports = router;
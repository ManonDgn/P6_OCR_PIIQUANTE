const express = require('express');
const router = express.Router();

// Appel des actions possibles par l'utilisateur
const userCtrl = require('../controllers/user');

//- Inscription
router.post('/signup', userCtrl.signup);
//- Connexion
router.post('/login', userCtrl.login);

module.exports = router;
const mongoose = require('mongoose');
// Plugin de vérification d'id utilisateur unique
const uniqueValidator = require('mongoose-unique-validator');
var passwordValidator = require('password-validator');

// Modèle-type de l'utilisateur
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model('User', UserSchema);
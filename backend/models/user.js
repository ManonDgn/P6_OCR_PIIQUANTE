const mongoose = require('mongoose');
// Plugin de vérification d'id utilisateur unique
const uniqueValidator = require('mongoose-unique-validator');
var passwordValidator = require('password-validator');

// Modèle-type de l'utilisateur
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Fonction de vérification de l'input mail
//const regexMail = new RegExp("/^[a-zA-Z0-9_.-]+@[a-z0-9]{2,}\.[a-z]{2,}$/");
// const inputEmail = UserSchema.email;

module.exports = mongoose.model('User', UserSchema);
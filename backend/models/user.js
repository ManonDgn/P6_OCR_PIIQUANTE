const mongoose = require('mongoose');
// Plugin de vérification d'id utilisateur unique
const uniqueValidator = require('mongoose-unique-validator');

// Modèle-type de l'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Appel du plugin 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
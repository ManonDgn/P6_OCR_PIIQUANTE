const mongoose = require('mongoose');

// Modèle-type d'une sauce
const sauceSchema = mongoose.Schema({
    userId : { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: [ "String <userId>" ]},
    usersDisliked: { type: [ "String <userId>" ]},
});

module.exports = mongoose.model('sauceModel', sauceSchema);
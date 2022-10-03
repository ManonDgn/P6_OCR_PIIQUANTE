const SauceModel = require('../models/sauce');

// Appel du package FS de Node pour pouvoir modifier le système de gestion de fichiers
const fs = require('fs');

// Fonction de création d'une sauce sur l'interface
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new SauceModel({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => {res.status(201).json({ message: 'Sauce ajoutée'})})
    .catch(error => { res.status(400).json( {error : 'Sauce non ajoutée' } )})
};

// Fonction d'affichage  de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    SauceModel.find()
    .then((sauces) => { res.status(200).json(sauces)})
    .catch(error => { res.status(400).json( {error : 'Sauces introuvables'} )});
};

// Fonction d'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {   
    SauceModel.findOne({ _id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce)})
    .catch(error => { res.status(400).json( {error : 'Sauce introuvable'} )});
};

// Fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {});
      SauceModel.deleteOne({ _id: req.params.id})
        .then(() => {res.status(200).json({message: 'Sauce supprimée !'})})
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
        res.status(500).json({error});
    })
};

// Fonction de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id})
        .then((sauce) => {
          const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
          SauceModel.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Sauce modifiée !'}))
          .catch(error => res.status(401).json({ error : 'Sauce non modifiée !'}));
        })
        .catch(error => { res.status(400).json( {error} )});
};

// Fonction de like-dislike des sauces par les utilisateurs
exports.likeOrDislikeSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
    .then((sauce) => {
        if (!sauce) {
        return res.status(404).json({
            error: "Cette sauce n'existe pas"})
        }
        const userLikeIndex = sauce.usersLiked.findIndex(
        (userId) => userId == req.body.userId
        );
        const userDislikeIndex = sauce.usersDisliked.findIndex(
        (userId) => userId == req.body.userId
        );
        if (req.body.like === 1) {
          if (userLikeIndex !== -1) {
              return res.status(500).json({
              error: "L'utilisateur a déjà liké cette sauce"
              });
        }
          if (userDislikeIndex !== -1) {
              sauce.usersDisliked.splice(userDislikeIndex, 1);
              sauce.dislikes--;
          }
      sauce.usersLiked.push(req.body.userId);
      sauce.likes++;
    }
    if (req.body.like === -1) {
      if (userDislikeIndex !== -1) {
        return res.status(500).json({
          error: "L'utilisateur a déjà disliké cette sauce",
        });
      }
      if (userLikeIndex !== -1) {
        sauce.usersLiked.splice(userLikeIndex, 1);
        sauce.likes--;
      }
      sauce.usersDisliked.push(req.body.userId);
      sauce.dislikes++;
    }
    if (req.body.like === 0) {
      if (userDislikeIndex !== -1) {
        sauce.usersDisliked.splice(userDislikeIndex, 1);
        sauce.dislikes--;
      }
      else if (userLikeIndex !== -1) {
        sauce.usersLiked.splice(userLikeIndex, 1);
        sauce.likes--;
      }
    }
    SauceModel.updateOne({ _id: req.params.id }, sauce).then(() => {
      res.status(200).json({ message: "Vote enregistré !" });
    });
    });
};
/*
Si l'utilisateur n'a pas voté 
    S'il veut liker

    Alors
    S'il veut disliker
    Alors

Sinon, l'utilisateur a déjà voté
ALORS



if (SauceModel.userId !== req.auth.userId) {
  res.status(403).json({error:"Vous n'êtes pas le propriétaire de cette sauce."})
};
*/


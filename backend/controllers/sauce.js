const sauceModel = require('../models/sauce');

// Appel du package FS de Node pour pouvoir modifier le système de gestion de fichiers
const fs = require('fs');

// Fonction de création d'une sauce sur l'interface
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new sauceModel({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => {res.status(201).json({ message: 'Objet ajouté'})})
    .catch(error => { res.status(400).json( {error} )})
};

// Fonction d'affichage  de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    sauceModel.find()
    .then((sauces) => { res.status(200).json(sauces)})
    .catch(error => { res.status(400).json( {error} )});
};

// Fonction d'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {   
    sauceModel.findOne({ _id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce)})
    .catch(error => { res.status(400).json( {error} )});
};

// Fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    sauceModel.findOneAndDelete({ _id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce)})
    .catch(error => { res.status(400).json( {error} )});
};

// Fonction de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    sauceModel.findOne({ _id: req.params.id})
        .then((sauce) => {
            sauceModel.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));
        })
        .catch(error => { res.status(400).json( {error} )});
};
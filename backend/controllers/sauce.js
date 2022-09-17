const sauceModel = require('../models/sauce');

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

exports.getAllSauces = (req, res, next) => {
    sauceModel.find()
    .then((sauces) => { res.status(200).json(sauces)})
    .catch(error => { res.status(400).json( {error} )});
};


exports.getOneSauce = (req, res, next) => {   
    sauceModel.findOne()
    .then((sauce) => { res.status(200).json(sauce)})
    .catch(error => { res.status(400).json( {error} )});
};
const jwt = require('jsonwebtoken');

// Configuration du Json Web Token pour la connexion d'un utilisateur
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.USER_TOKEN /*'Z6uG?61Gk:%z@iJ69YCrI-h~uXThX'*/);
       const userId = decodedToken.userId;
       if (req.body.userId && userId != req.body.userId) {
        return res.status(403).json({error : 'Non autorisé !'})
       } else {
        next();
       }
   } catch(error) {
       res.status(401).json({ error });
   }
};
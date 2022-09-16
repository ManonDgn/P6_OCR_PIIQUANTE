const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'Z6uG?61Gk:%z@iJ69YCrI;-h"~u)XThX');
       const userId = decodedToken.userId;
//    Vérif middleware d'authentification : console.log(req.auth);
       if (req.body.userId && userId != req.body.userId) {
        throw 'identifiant incorrect';
       } else {
        next();
       }
   } catch(error) {
       res.status(401).json({ error });
   }
};
// Importation de password-validator
const passwordValidator = require("password-validator");

// Schéma-type des mots de passe tolérés
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum 8 caractères
.is().max(30)                                   // Maximum 30 caractères
.has().uppercase(1)                             // Minimum 1 majuscule
.has().lowercase()                              // Doit avoir des minuscules
.has().digits(1)                                // Minimum 1 chiffre
.has().not().spaces()                           // Aucun espace toléré
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist les valeurs suivantes

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({error : `Format du mot de passe non valide, éléments manquants : ${passwordSchema.validate('req.body.password', {list: true})}`})
    }
};
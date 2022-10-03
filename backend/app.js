// Express
const express = require('express');
// Mongoose - MongoDB
const mongoose = require('mongoose');
// App et analyse de la requête 
const app = express();
app.use(express.json());

// ------- SECURITÉ
// FICHIER .ENV
require('dotenv').config();
// EXPRESS-MONGO-SANITIZE (remplace certains caractères spéciaux dans les inputs comme le $ ou le .)
const mongoSanitize = require('express-mongo-sanitize');
// XSS (Empêche les injections de script dans les inputs)
const xss = require('xss-clean');
// HELMET
const helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// Express-Rate-Limit (limite, par fenêtre de navigateur, le nombre de requêtes dans un temps donné. Ici 10 pour 15mn)
const rateLimit = require('express-rate-limit');

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// EXPRESS-MONGO-SANITIZE <-> App (caractères "$" et "." dans les inputs seront remplacés par un underscore "_")
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
);
// MongoDB <-> App
mongoose.connect('mongodb+srv://'+ process.env.ID_PASSWORD_MONGO +'@cluster0.3ddovs0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
// Express-Rate-Limit <-> App (Appliqué sur les routes User)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('./routes/user', limiter);
// XSS <-> App (Appliqué partout)
app.use(xss())

// Routes User --
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

// Routes Sauces -- 
const saucesRoutes = require('./routes/sauce');
app.use('/api/sauces', saucesRoutes);

// Routes Images -- 
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

// Export App
module.exports = app;
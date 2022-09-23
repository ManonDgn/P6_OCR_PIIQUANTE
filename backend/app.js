// Express -- 
const express = require('express');
// Mongoose - MongoDB --
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
// App et analyse de la requête -- 
const app = express();
app.use(express.json());

// XSS 
const xss = require('xss-clean');

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Helmet 
const helmet = require('helmet');
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}));

// Mongo Sanitize
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
);

// Express-Rate-Limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter)


// Connexion Base de données
mongoose.connect('mongodb+srv://MiaDgn:AZERTY@cluster0.3ddovs0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// XSS
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
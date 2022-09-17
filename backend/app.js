// Express -- 
const express = require('express');
// Mongoose - MongoDB --
const mongoose = require('mongoose');


// Connexion Base de données
mongoose.connect('mongodb+srv://MiaDgn:AZERTY@cluster0.3ddovs0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// App et analyse de la requête -- 
const app = express();
app.use(express.json());

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


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
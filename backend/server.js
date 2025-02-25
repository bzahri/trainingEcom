require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Connexion à la base de données
connectDB();

// Liste des origines autorisées
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// Configuration du middleware CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Autorise la requête
    } else {
      callback(new Error('Non autorisé par CORS')); // Refuse la requête
    }
  }
}));

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/project', projectRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

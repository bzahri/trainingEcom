require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
//const helmet = require('helmet');
//const rateLimit = require('rateLimit');
//const path = require('path');



const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const projectRoutes = require('./routes/projectRoutes');
const forumRoutes = require('./routes/forumRoutes');
const imageRoutes = require('./routes/imageRoutes')

const app = express();
connectDB();

// Configuration de CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
}));

// Sécuriser les en-têtes HTTP
//app.use(helmet());

// Limiter le taux de requêtes
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limite chaque IP à 100 requêtes par fenêtre
//   message: 'Trop de requêtes, veuillez réessayer plus tard.',
// });
// app.use(limiter);

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());



// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/images', imageRoutes); // Ajouter les routes des images
app.use("/uploads", express.static("uploads")); 
// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.message === 'Non autorisé par CORS') {
    return res.status(403).json({ message: 'Accès interdit par CORS' });
  }

  res.status(500).json({ message: 'Une erreur est survenue' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
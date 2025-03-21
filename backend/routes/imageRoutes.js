const express = require('express');
const {
  upload,
  uploadImage,
  getAllImages,
  getImageById,
  getUserImages,
  deleteImage
} = require('../controllers/imageController');
const { authMiddleware,adminMiddleware } = require('../middlewares/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Upload d'une image (nécessite authentification)
router.post('/upload',authMiddleware, upload.single('image'), uploadImage);

// Récupérer toutes les images (admin uniquement)
router.get('/', getAllImages);

// Récupérer les images de l'utilisateur connecté
router.get('/user',authMiddleware, getUserImages);

// Récupérer une image par son ID
router.get('/:id',authMiddleware, getImageById);

// Supprimer une image (seul le propriétaire ou un admin peut la supprimer)
router.delete('/:id',authMiddleware, deleteImage);

module.exports = router;

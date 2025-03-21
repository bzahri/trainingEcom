import Image from '../models/Image.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

// Configuration de Multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour le fichier
  },
});

export const upload = multer({ storage });

// Upload d'une image et l'associer à un utilisateur
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur authentifié (via middleware auth)

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Enregistrer l'image dans MongoDB avec l'ID de l'utilisateur
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      userId: userId, // Associer l'image à l'utilisateur
    });

    await newImage.save();

    // Ajouter l'image à la liste des images de l'utilisateur
    user.images.push(newImage._id);
    await user.save();

    res.status(201).json({ message: 'Image téléchargée avec succès', image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image' });
  }
};

// Récupérer toutes les images 
export const getAllImages = async (req, res) => {
  try {

    const images = await Image.find().populate('userId', 'username email');
    const updatedImages = images.map((img) => ({
      _id: img._id,
      filename: img.filename,
      url: `${req.protocol}://${req.get('host')}/uploads/${img.filename}`, // URL complète de l'image
      userId: img.userId,
    }));
    
    res.status(200).json(updatedImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des images' });
  }
};


// Récupérer une image par son ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id).populate('userId', 'username email');
    if (!image) {
      return res.status(404).json({ message: 'Image non trouvée' });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'image' });
  }
};

// Récupérer les images d'un utilisateur spécifique
export const getUserImages = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur authentifié

    const images = await Image.find({ userId });
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des images de l\'utilisateur' });
  }
};

// Supprimer une image (Uniquement l'utilisateur qui l'a uploadée ou un admin)
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image non trouvée' });
    }

    if (image.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorisé à supprimer cette image' });
    }

    // Supprimer l'image de la liste de l'utilisateur
    await User.findByIdAndUpdate(image.userId, { $pull: { images: image._id } });

    // Supprimer l'image de la base de données
    await image.deleteOne();

    res.status(200).json({ message: 'Image supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'image' });
  }
};

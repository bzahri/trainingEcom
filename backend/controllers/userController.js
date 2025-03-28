const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 📌 Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    const newUser = new User({ username, email, password, userType });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

// 📌 Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = user.generateToken();
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

// 📌 Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

// 📌 Récupérer uniquement les étudiants
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ userType: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
  }
};

// 📌 Récupérer uniquement les professeurs
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ userType: "teacher" }).select("-password");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des professeurs" });
  }
};

// 📌 Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { username, email, userType, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, userType, profilePicture },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// 📌 Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};

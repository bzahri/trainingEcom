const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
    console.log("req.body"+req.body);
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Connexion de l'utilisateur
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Identifiants incorrects' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Identifiants incorrects' });

        const token = user.generateToken();

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

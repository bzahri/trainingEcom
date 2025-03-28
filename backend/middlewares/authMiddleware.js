require('dotenv').config();
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès interdit, token manquant' });
    }
    
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET );
        
        req.user = decoded; // Stocker l'utilisateur authentifié dans req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide : authMiddleware catch' });
    }
};

// Vérifier si l'utilisateur est admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès interdit : Administrateurs uniquement" });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };




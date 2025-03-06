const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Rôle user/admin
    profilePicture: { type: String, default: '' } // URL de la photo de profil
});

// Hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Comparer le mot de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Générer un token JWT
userSchema.methods.generateToken = function () {
    try {
        // Inclure name et email dans le token
        return jwt.sign(
            {
                id: this._id,
                name: this.username,     // Ajout du nom
                email: this.email,   // Ajout de l'email
                role: this.role,     // Ajout du rôle
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
    } catch (err) {
        throw new Error('Token generation failed');
    }
};


module.exports = mongoose.model('User', userSchema);

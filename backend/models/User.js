const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Rôle user/admin
    userType: { type: String, enum: ['student', 'teacher'], default: 'student' }, // Nouveau champ
    profilePicture: { type: String, default: 'https://example.com/default-profile.png' },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // ✅ Ajout de la relation avec les cours

});

// Méthodes existantes (hachage, comparaison de mot de passe, génération de token)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                id: this._id,
                name: this.username,
                email: this.email,
                profilePicture: this.profilePicture,
                userType: this.userType // Inclure le type d'utilisateur dans le token
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
    } catch (err) {
        throw new Error('Token generation failed');
    }
};

module.exports = mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Lien avec l'utilisateur
});

const Image = mongoose.model('Image', imageSchema);
export default Image;

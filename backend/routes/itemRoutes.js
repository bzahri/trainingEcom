const express = require('express');
const Item = require('../models/Item');
const { authMiddleware, adminMiddleware }  = require('../middlewares/authMiddleware');

const router = express.Router();

// Ajouter un nouvel item
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer tous les items
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Récupérer un item par ID
router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item non trouvé' });
    res.json(item);
});

// Mettre à jour un item
router.put('/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
});

// Supprimer un item
router.delete('/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item supprimé' });
});

module.exports = router;

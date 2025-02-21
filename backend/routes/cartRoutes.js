const express = require('express');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

const router = express.Router();

// Ajouter un item au panier
router.post('/:userId', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            cart = new Cart({ user: req.params.userId, items: [] });
        }

        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item non trouvé' });

        // Vérifier si l'item est déjà dans le panier
        const existingItem = cart.items.find(i => i.item.toString() === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ item: itemId, quantity });
        }

        cart.totalPrice = cart.items.reduce((sum, i) => sum + i.quantity * item.price, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer le panier d'un utilisateur
router.get('/:userId', async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.item');
    if (!cart) return res.status(404).json({ message: 'Panier non trouvé' });
    res.json(cart);
});

// Supprimer un item du panier
router.delete('/:userId/:itemId', async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Panier non trouvé' });

    cart.items = cart.items.filter(i => i.item.toString() !== req.params.itemId);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);

    await cart.save();
    res.json(cart);
});

module.exports = router;

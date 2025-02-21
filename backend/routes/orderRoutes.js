const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// 🔹 Passer une commande
router.post('/checkout', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Votre panier est vide' });
        }

        const totalPrice = cart.items.reduce((total, i) => total + i.quantity * i.item.price, 0);

        const order = new Order({
            user: req.user.id,
            items: cart.items,
            totalPrice
        });

        await order.save();
        await Cart.findOneAndDelete({ user: req.user.id });

        res.json({ message: 'Commande passée avec succès', order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// 🔹 Récupérer les commandes de l'utilisateur
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.item');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// 🔹 Admin : Récupérer toutes les commandes
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('items.item');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;

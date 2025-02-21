import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du panier", error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.item._id !== itemId),
      }));
    } catch (error) {
      alert("Erreur lors de la suppression du produit.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Votre Panier</h2>
      {cart && cart.items.length > 0 ? (
        cart.items.map((item) => (
          <div key={item.item._id} className="cart-item">
            <h3>{item.item.name}</h3>
            <p>Quantité: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.item._id)}>Retirer</button>
          </div>
        ))
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;

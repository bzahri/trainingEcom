import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
      }
    };
    fetchItems();
  }, []);

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { itemId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Produit ajouté au panier !");
    } catch (error) {
      alert("Erreur lors de l'ajout au panier.");
    }
  };

  return (
    <div className="home-container">
      <h2>Produits disponibles</h2>
      <div className="product-list">
        {items.map((item) => (
          <div key={item._id} className="product">
            <h3>{item.name}</h3>
            <p>{item.price} MAD</p>
            <button onClick={() => addToCart(item._id)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

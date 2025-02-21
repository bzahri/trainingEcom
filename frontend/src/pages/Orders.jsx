import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Historique des Commandes</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order">
            <h3>Commande #{order._id}</h3>
            <p>Statut: {order.status}</p>
            <p>Total: {order.totalPrice} MAD</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.item._id}>
                  {item.item.name} - Quantité: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Aucune commande passée.</p>
      )}
    </div>
  );
};

export default Orders;

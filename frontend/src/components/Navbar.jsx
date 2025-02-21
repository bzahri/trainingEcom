import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/cart">Panier</Link>
      <Link to="/orders">Commandes</Link>
      {token ? (
        <button onClick={handleLogout}>Déconnexion</button>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </nav>
  );
};

export default Navbar;

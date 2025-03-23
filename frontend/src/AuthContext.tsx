// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { jwtDecode } from "jwt-decode";

// // Définition du type pour le token décodé
// interface DecodedToken {
//   name: string;
//   profilePicture: string;
//   email: string;
//   exp: number; // Expiration du token
// }

// // Définition du type du contexte
// interface AuthContextType {
//   user: DecodedToken | null;
//   login: (token: string) => void;
//   logout: () => void;
// }

// // Création du contexte
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Provider du contexte
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<DecodedToken | null>(null);

//   // Fonction pour récupérer l'utilisateur depuis le token
//   const getUserFromToken = (token: string): DecodedToken | null => {
//     try {
//       return jwtDecode<DecodedToken>(token);
//     } catch (error) {
//       console.error("Token invalide", error);
//       return null;
//     }
//   };

//   // Fonction de connexion
//   const login = (token: string) => {
//     localStorage.setItem("token", token);
//     const decodedUser = getUserFromToken(token);
//     setUser(decodedUser);
//   };

//   // Fonction de déconnexion
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // Charger l'utilisateur au démarrage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedUser = getUserFromToken(token);
//       if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
//         setUser(decodedUser); // L'utilisateur est authentifié et non expiré
//       } else {
//         logout(); // Supprimer le token expiré
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook personnalisé pour utiliser le contexte
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

// Définition du type pour le token décodé
interface DecodedToken {
  name: string;
  email: string;
  profilePicture: string;
  exp: number; // Expiration du token en timestamp UNIX
}

// Définition du type du contexte
interface AuthContextType {
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Fonction pour récupérer l'utilisateur depuis le token
  const getUserFromToken = (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Token invalide", error);
      return null;
    }
  };

  // Fonction de connexion
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedUser = getUserFromToken(token);
    if (decodedUser) setUser(decodedUser);
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = getUserFromToken(token);
      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        setUser(decodedUser); // L'utilisateur est authentifié et non expiré
      } else {
        logout(); // Supprimer le token expiré
      }
    }
  }, []);

  // Écouter le stockage local pour mise à jour en temps réel (multi-onglets)
  useEffect(() => {
    const syncAuth = (event: StorageEvent) => {
      if (event.key === "token") {
        if (event.newValue) {
          const decodedUser = getUserFromToken(event.newValue);
          if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
            setUser(decodedUser);
          } else {
            logout();
          }
        } else {
          logout();
        }
      }
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // Optimisation avec useMemo pour éviter les re-rendus inutiles
  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

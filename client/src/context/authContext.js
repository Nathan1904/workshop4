import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Création du contexte d'authentification
export const AuthContext = createContext();

// Fournisseur de contexte pour gérer l'état d'authentification
export const AuthContexProvider = ({ children }) => {
  // Initialisation de l'état avec les données de l'utilisateur ou null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Fonction de connexion : effectue une requête et met à jour l'utilisateur
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  // Fonction de déconnexion : effectue une requête et met à jour l'utilisateur
  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // Mise à jour de localStorage lors des changements d'utilisateur
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Fournit l'état actuel de l'utilisateur et les fonctions de connexion/déconnexion aux composants enfants
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
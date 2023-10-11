import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  // Utilisation du hook useState pour gérer l'état des champs de formulaire "username" et "password"
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // Utilisation du hook useState pour gérer les erreurs lors de la connexion
  const [err, setError] = useState(null);

  // Utilisation du hook useNavigate pour la navigation dans l'application
  const navigate = useNavigate();

  // Utilisation du hook useContext pour accéder à la fonction de connexion "login" du contexte d'authentification
  const { login } = useContext(AuthContext);

  // Fonction handleChange pour mettre à jour l'état des champs de formulaire lors de la saisie
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fonction handleSubmit pour gérer la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel de la fonction de connexion "login" avec les données du formulaire
      await login(inputs);
      navigate("/"); // Redirection vers la page d'accueil après une connexion réussie
    } catch (err) {
      setError(err.response.data); // Gestion des erreurs en cas d'échec de la connexion
    }
  };

  // Rendu JSX du composant Login
  return (
    <div className="auth">
      <h1>Identification</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>S'identifier</button>
        {err && <p>{err}</p>} {/* Affichage des erreurs s'il y en a */}
        <span>
          Vous n'avez pas de compte? <Link to="/register">S'inscrire</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

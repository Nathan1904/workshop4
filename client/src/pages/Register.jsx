import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // Utilisation du hook useState pour gérer l'état des champs de formulaire "username", "email" et "password"
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Utilisation du hook useState pour gérer les erreurs lors de l'inscription
  const [err, setError] = useState(null);

  // Utilisation du hook useNavigate pour la navigation dans l'application
  const navigate = useNavigate();

  // Fonction handleChange pour mettre à jour l'état des champs de formulaire lors de la saisie
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fonction handleSubmit pour gérer la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi d'une requête POST avec axios pour l'inscription en utilisant les données du formulaire
      await axios.post("/auth/register", inputs);
      navigate("/login"); // Redirection vers la page de connexion après une inscription réussie
    } catch (err) {
      setError(err.response.data); // Gestion des erreurs en cas d'échec de l'inscription
    }
  };

  // Rendu JSX du composant Register
  return (
    <div className="auth">
      <h1>Inscription</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>S'inscrire</button>
        {err && <p>{err}</p>} {/* Affichage des erreurs s'il y en a */}
        <span>
          Vous avez déjà un compte? <Link to="/login">S'identifier</Link>
        </span>
      </form>
    </div>
  );
};

// Exportation du composant Register pour une utilisation dans d'autres parties de l'application
export default Register;
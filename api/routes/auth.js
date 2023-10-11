// Importation du module Express
import express from "express";

// Importation des fonctions de contrôleur pour l'authentification
import { register, login, logout } from "../controllers/auth.js";

// Création d'un routeur Express
const router = express.Router();

// Définition des routes pour l'inscription, la connexion et la déconnexion
router.post("/register", register);
router.post("/login", login);      
router.post("/logout", logout);     

// Exportation du routeur pour une utilisation ultérieure
export default router;
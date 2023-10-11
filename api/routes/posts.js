// Importation du module Express
import express from "express";

// Importation des fonctions de contrôleur pour les articles (posts)
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

// Création d'un routeur Express
const router = express.Router();

// Définition des routes pour les opérations sur les articles
router.get("/", getPosts);       // Route pour obtenir la liste des articles
router.get("/:id", getPost);     // Route pour obtenir un article spécifique par ID
router.post("/", addPost);       // Route pour ajouter un nouvel article
router.delete("/:id", deletePost); // Route pour supprimer un article par ID
router.put("/:id", updatePost);   // Route pour mettre à jour un article par ID

// Exportation du routeur pour une utilisation ultérieure
export default router;
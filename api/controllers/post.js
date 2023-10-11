import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Fonction pour obtenir la liste des articles
export const getPosts = (req, res) => {
  // Construction de la requête SQL en fonction de la catégorie (si spécifiée dans la requête)
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  // Exécute la requête SQL en utilisant la base de données et renvoie les résultats
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

// Fonction pour obtenir un article spécifique
export const getPost = (req, res) => {
  // Requête SQL pour obtenir les détails d'un article en joignant la table des utilisateurs
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  // Exécute la requête SQL en utilisant la base de données et renvoie le résultat
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

// Fonction pour ajouter un nouvel article
export const addPost = (req, res) => {
  // Vérifie la présence d'un jeton JWT dans les cookies
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // Vérifie la validité du jeton JWT et obtient les informations de l'utilisateur
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Requête SQL pour insérer un nouvel article dans la base de données
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    // Exécute la requête SQL en utilisant la base de données et renvoie une réponse appropriée
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

// Fonction pour supprimer un article
export const deletePost = (req, res) => {
  // Vérifie la présence d'un jeton JWT dans les cookies
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // Vérifie la validité du jeton JWT et obtient les informations de l'utilisateur
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // ID de l'article à supprimer
    const postId = req.params.id;
    // Requête SQL pour supprimer l'article uniquement s'il appartient à l'utilisateur actuel
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    // Exécute la requête SQL en utilisant la base de données et renvoie une réponse appropriée
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

// Fonction pour mettre à jour un article
export const updatePost = (req, res) => {
  // Vérifie la présence d'un jeton JWT dans les cookies
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // Vérifie la validité du jeton JWT et obtient les informations de l'utilisateur
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // ID de l'article à mettre à jour
    const postId = req.params.id;
    // Requête SQL pour mettre à jour l'article uniquement s'il appartient à l'utilisateur actuel
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    // Exécute la requête SQL en utilisant la base de données et renvoie une réponse
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
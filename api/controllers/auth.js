import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fonction d'inscription d'un nouvel utilisateur
export const register = (req, res) => {
  // Requête pour vérifier si l'utilisateur existe déjà en fonction de l'email ou du nom d'utilisateur
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  // Exécute la requête SQL avec les valeurs fournies dans la requête HTTP
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

    // Génère un salt aléatoire
    const salt = bcrypt.genSaltSync(10);
    // Hache le mot de passe fourni par l'utilisateur avec le salt
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Requête pour insérer les informations de l'utilisateur dans la base de données
    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    // Exécute la requête SQL pour insérer l'utilisateur dans la base de données
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

// Fonction de connexion de l'utilisateur
export const login = (req, res) => {
  // Requête pour rechercher l'utilisateur en fonction de son nom d'utilisateur
  const q = "SELECT * FROM users WHERE username = ?";

  // Exécute la requête SQL avec le nom d'utilisateur fourni dans la requête HTTP
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Vérifi si le mot de passe fourni correspond au mot de passe haché stocké en base de données
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // Si le mot de passe est incorrect, renvoie une erreur
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Génère un jeton JWT contenant l'ID de l'utilisateur
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    // Supprime le mot de passe des données de l'utilisateur pour des raisons de sécurité
    const { password, ...other } = data[0];

    // Crée un cookie "access_token" contenant le jeton JWT
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

// Fonction de déconnexion de l'utilisateur
export const logout = (req, res) => {
  // Supprime le cookie "access_token"
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.");
};
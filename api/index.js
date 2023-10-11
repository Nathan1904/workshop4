import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

// Création d'une instance d'Express
const app = express();

// Utilisation du middleware pour analyser les requêtes JSON
app.use(express.json());

// Utilisation du middleware cookie-parser pour analyser les cookies
app.use(cookieParser());

// Configuration de Multer pour le stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload"); // Répertoire de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Nom de fichier unique basé sur la date et le nom d'origine du fichier
  },
});

const upload = multer({ storage }); // Configuration de Multer avec le stockage défini ci-dessus

// Route pour gérer le téléchargement de fichiers
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename); // Répond avec le nom de fichier téléchargé
});

// Utilisation des routes pour l'authentification, les utilisateurs et les articles
app.use("/api/auth", authRoutes);    // Routes liées à l'authentification
app.use("/api/users", userRoutes);    // Routes liées aux utilisateurs
app.use("/api/posts", postRoutes);    // Routes liées aux articles (posts)

// Démarrage du serveur Express sur le port 8800
app.listen(8800, () => {
  console.log("Connected!"); // Affiche un message lorsque le serveur est connecté
});
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  // Récupération des données de l'emplacement actuel (state) via useLocation
  const state = useLocation().state;

  // Utilisation du hook useState pour gérer l'état des données "value" (contenu), "title" (titre), "file" (image) et "cat" (catégorie)
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // Utilisation du hook useNavigate pour la navigation dans l'application
  const navigate = useNavigate();

  // Fonction upload pour envoyer l'image sélectionnée au serveur
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data; // Retourne l'URL de l'image téléchargée
    } catch (err) {
      console.log(err); // Gestion des erreurs en cas de problème lors du téléchargement de l'image
    }
  };

  // Fonction handleClick pour gérer la publication ou la mise à jour d'un article
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); // Récupère l'URL de l'image téléchargée

    try {
      // Si l'état (state) existe, il s'agit d'une mise à jour d'article, sinon c'est une nouvelle publication
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "", // Utilise l'URL de l'image téléchargée ou une chaîne vide si aucune image n'a été téléchargée
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "", // Utilise l'URL de l'image téléchargée ou une chaîne vide si aucune image n'a été téléchargée
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // Utilise la date actuelle au format spécifié
          });
      navigate("/"); // Redirection vers la page d'accueil après la publication ou la mise à jour
    } catch (err) {
      console.log(err); // Gestion des erreurs en cas d'échec de la publication ou de la mise à jour
    }
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publier</h1>
          <span>
            <b>Status: </b> Brouillon
          </span>
          <span>
            <b>Visibilité: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Charger Image
          </label>
          <div className="buttons">
            <button>Enregistrer comme brouillon</button>
            <button onClick={handleClick}>Publier</button>
          </div>
        </div>
        <div className="item">
          <h1>Categorie</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sports"}
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "news"}
              name="cat"
              value="news"
              id="news"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="news">Actus</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technologie</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "fashion"}
              name="cat"
              value="fashion"
              id="fashion"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="fashion">Fashion</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Gastronomie</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

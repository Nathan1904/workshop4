import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // Utilisation du hook useState pour gérer l'état des données des articles (posts)
  const [posts, setPosts] = useState([]);

  // Récupération de la catégorie (cat) à partir de l'emplacement actuel
  const cat = useLocation().search;

  // Utilisation du hook useEffect pour effectuer une requête HTTP lors du chargement du composant ou lorsque la catégorie change
  useEffect(() => {
    // Fonction asynchrone fetchData pour effectuer la requête HTTP
    const fetchData = async () => {
      try {
        // Envoi d'une requête GET avec axios pour obtenir des articles en fonction de la catégorie (cat)
        const res = await axios.get(`/posts${cat}`);
        // Mise à jour de l'état "posts" avec les données reçues
        setPosts(res.data);
      } catch (err) {
        console.log(err); // Gestion des erreurs en cas de problème lors de la requête
      }
    };
    fetchData(); // Appel de la fonction fetchData pour déclencher la requête au chargement du composant ou lors du changement de catégorie
  }, [cat]); // Dépendance "cat" pour recharger les données lorsque la catégorie change

  // Fonction getText pour extraire le texte du contenu HTML d'un article
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Rendu JSX du composant Home
  return (
    <div className="home">
      <div className="posts">
        {/* Mapping des articles récupérés pour les afficher */}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              {/* Affichage de l'image de l'article avec le chemin relatif */}
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              {/* Lien vers la page de l'article en utilisant l'ID de l'article */}
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* Appel de la fonction getText pour afficher un extrait du contenu de l'article */}
              <p>{getText(post.desc)}</p>
              <button>Plus...</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
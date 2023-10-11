import axios from "axios";
import React, { useEffect, useState } from "react";

// Définition du composant Menu avec une prop "cat" passée en argument
const Menu = ({ cat }) => {
  // Utilisation du hook useState pour gérer l'état des données de posts
  const [posts, setPosts] = useState([]);

  // Utilisation du hook useEffect pour effectuer une requête HTTP lors du chargement du composant
  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête HTTP
    const fetchData = async () => {
      try {
        // Envoi d'une requête GET avec axios pour obtenir des articles en fonction de la catégorie (cat)
        const res = await axios.get(`/posts/?cat=${cat}`);
        // Mise à jour de l'état "posts" avec les données reçues
        setPosts(res.data);
      } catch (err) {
        console.log(err); // Gestion des erreurs en cas de problème lors de la requête
      }
    };
    fetchData(); // Appel de la fonction fetchData pour déclencher la requête au chargement du composant
  }, [cat]); // Dépendance "cat" pour recharger les données lorsque la catégorie change

  // Rendu JSX de  Menu
  return (
    <div className="menu">
      <h1>Suggestions de posts</h1>
      {/* Mapping des articles récupérés pour les afficher */}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          {/* Affichage de l'image de l'article avec le chemin relatif */}
          <img src={`../public/upload/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Plus...</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
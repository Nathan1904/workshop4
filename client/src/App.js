import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/", // Chemin de base
    element: <Layout />, // Utilisation du composant `Layout` comme mise en page de base
    children: [
      {
        path: "/", // Chemin de la page d'accueil
        element: <Home />, // Composant de la page d'accueil
      },
      {
        path: "/post/:id", // Chemin pour afficher un article unique
        element: <Single />, // Composant de la page d'affichage d'article unique
      },
      {
        path: "/write", // Chemin pour la page de rédaction d'article
        element: <Write />, // Composant de la page de rédaction
      },
    ],
  },
  {
    path: "/register", // Chemin pour la page d'inscription
    element: <Register />, // Composant de la page d'inscription
  },
  {
    path: "/login", // Chemin pour la page de connexion
    element: <Login />, // Composant de la page de connexion
  },
]);

// Composant principal de l'application
function App() {
  return (
    <div className="app"> {/* Conteneur principal de l'application */}
      <div className="container"> {/* Conteneur pour le contenu de l'application */}
        <RouterProvider router={router} /> {/* Fournit le routeur à toute l'application */}
      </div>
    </div>
  );
}

export default App;
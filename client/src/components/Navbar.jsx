import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=sports">
            <h6>SPORTS</h6>
          </Link>
          <Link className="link" to="/?cat=news">
            <h6>ACTU</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGIE</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=fashion">
            <h6>FASHION</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>GASTRONOMIE</h6>
          </Link>
          {/* Affichage du nom d'utilisateur s'il est connecté */}
          <span>{currentUser?.username}</span>
          {/* Affichage du bouton de déconnexion s'il est connecté, sinon lien de connexion */}
          {currentUser ? (
            <span onClick={logout}>Déconnexion</span>
          ) : (
            <Link className="link" to="/login">
              Connexion
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Ecrire
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

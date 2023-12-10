import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <nav>
      <ul>
      <h1 className="menu-title">Encuestas</h1>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/encuesta/crear">Crear Encuesta</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Menu;

import React from "react";
import { Link } from "react-router-dom";

const Inicio = ({ listaEncuestas }) => {
  console.log(listaEncuestas);
  return (
    <div>
      <h1>Lista de Encuestas Disponibles</h1>
      {listaEncuestas.map((encuesta) => (
        <div key={encuesta.id} className="encuesta-item-container">
          <div className="encuesta-item">
            <h2>{encuesta.titulo}</h2>
            <p>{encuesta.descripcion}</p>
            <Link to={`/encuesta/${encuesta.id}`} className="see-survey">
              Ver encuesta
            </Link>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inicio;

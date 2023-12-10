import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams();
  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));

  // Estado para mantener las respuestas
  const [respuestas, setRespuestas] = useState({});

  // Inicializa el estado de las respuestas si estás editando una encuesta existente
  useEffect(() => {
    if (encuesta.respuestas) {
      setRespuestas(encuesta.respuestas[0]); // Supongo que solo hay una respuesta, puedes ajustarlo si es necesario
    }
  }, [encuesta]);

  const handleRespuestaChange = (preguntaId, opcionId) => {
    setRespuestas({
      ...respuestas,
      [preguntaId]: opcionId,
    });
  };

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta.titulo}</h2>
          <p>{encuesta.descripcion}</p>
          <br />
        </div>
      </div>
      <div className="encuesta-item-container">
        <div className="encuesta-item" style={{ textAlign: "center" }}>
          <h2>Preguntas</h2>
          {!encuesta.preguntas && <p>Sin preguntas definidas.</p>}
          {encuesta.preguntas &&
            encuesta.preguntas.map((pregunta) => (
              <div key={pregunta.id}>
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  {pregunta.pregunta}
                </p>
                <form>
                  {pregunta.opciones.map((opcion) => (
                    <div key={opcion.id} className="opcion-container">
                      <label className="opcion-label">
                        <input
                          type="radio"
                          name={`pregunta_${pregunta.id}`}
                          value={opcion.id}
                          checked={respuestas[pregunta.id] === opcion.id}
                          onChange={() =>
                            handleRespuestaChange(pregunta.id, opcion.id)
                          }
                        />
                        {opcion.texto}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            ))}
        </div>
      </div>
      <button
        type="submit"
        className="sent-survey"
        onClick={() => responderEncuesta(id, respuestas)}
      >
        Enviar Encuesta
      </button>
      <Link to="/" className="back">
        Volver
      </Link>
    </div>
  );
};

export default Encuesta;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CrearEncuesta = ({ agregarEncuesta }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Función para generar una nueva clave única
  const generateUniqueKey = () => Date.now();

  // Estado para mantener un seguimiento de las preguntas y sus opciones
  const [preguntas, setPreguntas] = useState([
    {
      id: generateUniqueKey(),
      pregunta: "",
      opciones: [
        { id: generateUniqueKey(), texto: "Opción 1" },
      ],
    },
  ]);

  const onSubmit = (data) => {
    // Combinar los datos del formulario con las preguntas y opciones
    const encuestaData = {
      ...data,
      preguntas: preguntas.map((preguntaItem) => ({
        id: preguntaItem.id,
        pregunta: preguntaItem.pregunta,
        opciones: preguntaItem.opciones
          .filter((opcion) => opcion.texto.trim() !== "")
          .map((opcion) => ({ id: opcion.id, texto: opcion.texto })),
      })),
    };

    agregarEncuesta(encuestaData);
    navigate("/");
  };

  // Función para agregar una pregunta
  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        id: generateUniqueKey(),
        pregunta: "",
        opciones: [{ id: generateUniqueKey(), texto: "" }],
      },
    ]);
  };

  // Función para agregar una opción a una pregunta específica
  const agregarOpcion = (preguntaId) => {
    const nuevasPreguntas = [...preguntas];
    const preguntaIndex = nuevasPreguntas.findIndex(
      (pregunta) => pregunta.id === preguntaId
    );

    if (preguntaIndex !== -1) {
      nuevasPreguntas[preguntaIndex].opciones.push({
        id: generateUniqueKey(),
        texto: "",
      });
      setPreguntas(nuevasPreguntas);
    }
  };

  // Función para manejar cambios en el texto de pregunta
  const handlePreguntaChange = (index, event) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].pregunta = event.target.value;
    setPreguntas(nuevasPreguntas);
  };

  // Función para manejar cambios en el texto de opción
  const handleOpcionChange = (preguntaIndex, opcionIndex, event) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex].texto =
      event.target.value;
    setPreguntas(nuevasPreguntas);
  };

  return (
    <div>
      <h1 className="new-survey">Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          {...register("titulo", {
            required: "Este campo es obligatorio",
            maxLength: {
              value: 50,
              message: "El título debe tener menos de 50 caracteres",
            },
          })}
        />
        <p className="error">{errors.titulo && errors.titulo.message}</p>
        <label>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          {...register("descripcion", {
            maxLength: {
              value: 200,
              message: "La descripción debe tener menos de 200 caracteres",
            },
          })}
        />
        <p className="error">
          {errors.descripcion && errors.descripcion.message}
        </p>

        {/* Mapear y mostrar las preguntas y opciones */}
        {preguntas.map((preguntaItem, preguntaIndex) => (
          <div key={preguntaItem.id}>
            <label>Pregunta:</label>
            <input
              type="text"
              {...register(`preguntas[${preguntaIndex}].pregunta`, {
                required: "Este campo es obligatorio",
              })}
              value={preguntaItem.pregunta}
              onChange={(event) => handlePreguntaChange(preguntaIndex, event)}
            />
            <p className="error">
              {errors.preguntas &&
                errors.preguntas[preguntaIndex] &&
                errors.preguntas[preguntaIndex].pregunta &&
                errors.preguntas[preguntaIndex].pregunta.message}
            </p>

            {/* Mapear y mostrar las opciones para esta pregunta */}
            {preguntaItem.opciones.map((opcion, opcionIndex) => (
              <div key={opcion.id}>
                <label>Opción:</label>
                <input
                  type="text"
                  {...register(
                    `preguntas[${preguntaIndex}].opciones[${opcionIndex}].texto`
                  )}
                  value={opcion.texto}
                  onChange={(event) =>
                    handleOpcionChange(preguntaIndex, opcionIndex, event)
                  }
                />
              </div>
            ))}

            {/* Botón para agregar una opción */}
            <button
              type="button"
              onClick={() => agregarOpcion(preguntaItem.id)}
              className="add-button"
            >
              Agregar Opción
            </button>
          </div>
        ))}

        {/* Botón para agregar una pregunta */}
        <button
          type="button"
          onClick={agregarPregunta}
          className="add-button"
        >
          Agregar Pregunta
        </button>

        <div className="button-container">
          <Link to="/">
            <button type="button" className="cancel">
              Cancelar
            </button>
          </Link>
          <button type="submit" className="create">
            Guardar Encuesta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEncuesta;

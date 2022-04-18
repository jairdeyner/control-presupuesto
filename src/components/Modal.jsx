import { useState, useEffect } from "react";

import Message from "./Message";

import IconClose from "../img/cerrar.svg";

const Modal = ({
  animateModal,
  setModal,
  setAnimateModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      const { nombre, cantidad, categoria } = gastoEditar;
      setNombre(nombre);
      setCantidad(cantidad);
      setCategoria(categoria);
      setId(gastoEditar.id);
    }
  }, [gastoEditar]);

  const handleCloseModal = () => {
    setAnimateModal(false);
    if (Object.keys(gastoEditar).length > 0) {
      setGastoEditar({});
    }

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      console.log("fallo la validacionf");

      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }

    guardarGasto({ nombre, cantidad, categoria, id });
  };

  return (
    <div className={`modal ${animateModal ? "fadeIn" : "fadeOut"}`}>
      <div className="cerrar-modal">
        <img src={IconClose} alt="close modal" onClick={handleCloseModal} />
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="formulario">
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        {mensaje && <Message typeMessage="error">{mensaje}</Message>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder="Añade el nombre del gasto"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade la cantidad del gasto ej: 300"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};
export default Modal;

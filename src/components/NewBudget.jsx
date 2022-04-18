import { useState } from "react";
import Message from "./Message";

const NewBudget = ({ budget, setBudget, setIsValidBudge }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Number(budget) || Number(budget) < 0) {
      setMessage("No es un presupuesto válido");
      return;
    }

    setMessage("");
    setIsValidBudge(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />

        {message && <Message typeMessage="error">{message}</Message>}
      </form>
    </div>
  );
};
export default NewBudget;

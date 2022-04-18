import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetControl = ({
  budget,
  gastos,
  setGastos,
  setBudget,
  setIsValidBudge,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);
    const totalDisponible = budget - totalGastado;

    const nuevoPorcentaje = (
      ((budget - totalDisponible) / budget) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]);

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const res = confirm("¿Deseas reiniciar presupuesto y gastos?");

    if (res) {
      setBudget(0);
      setGastos([]);
      setIsValidBudge(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatAmount(budget)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {formatAmount(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatAmount(gastado)}
        </p>
      </div>
    </div>
  );
};
export default BudgetControl;

import { useState, useEffect } from "react";
import Filtros from "./components/Filtros";

import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";

import IconNewBudget from "./img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(0);
  const [isValidBudge, setIsValidBudge] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNewBudget();
    }
  }, [gastoEditar]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto"));
    const gastosLS = JSON.parse(localStorage.getItem("gastos"));

    if (presupuestoLS) {
      setBudget(presupuestoLS);
      setIsValidBudge(true);
    }

    if (gastosLS) {
      setGastos(gastosLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("presupuesto", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const handleNewBudget = () => {
    setModal(true);
    setAnimateModal(true);
  };

  const guardarGasto = (gasto) => {
    gasto.fecha = Date.now();

    if (gasto.id) {
      // actualizar gasto
      const gastosActualizados = gastos.map((g) =>
        g.id === gasto.id ? gasto : g
      );

      setGastos(gastosActualizados);
      setGastoEditar({});
    }

    if (!gasto.id) {
      gasto.id = generarId();

      setGastos([...gastos, gasto]);
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);

    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        budget={budget}
        setBudget={setBudget}
        isValidBudge={isValidBudge}
        setIsValidBudge={setIsValidBudge}
      />

      {isValidBudge && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNewBudget}
              alt="icon new brudget"
              onClick={handleNewBudget}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;

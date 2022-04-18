import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";

const Header = ({
  budget,
  setBudget,
  isValidBudge,
  setIsValidBudge,
  gastos,
  setGastos,
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidBudge ? (
        <BudgetControl
          setGastos={setGastos}
          budget={budget}
          setBudget={setBudget}
          gastos={gastos}
          setIsValidBudge={setIsValidBudge}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudge={setIsValidBudge}
        />
      )}
    </header>
  );
};
export default Header;

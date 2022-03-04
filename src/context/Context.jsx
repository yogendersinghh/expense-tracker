import React, { useReducer, createContext } from "react";
import ContextReducer from "./ContextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];
const ExpenseTrackerContext = createContext();

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(ContextReducer, initialState);
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce((acc, currentVal) => {
    return currentVal.type === "Expense"
      ? acc - currentVal.amount
      : acc + currentVal.amount;
  }, 0);
  console.log(transactions);
  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
export { ExpenseTrackerContext };

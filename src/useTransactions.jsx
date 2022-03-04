import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/Context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/Category";

const useTransactions = (title) => {
  console.log(title);
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  console.log(transactions);
  const selectedCategories = transactions.filter((t) => t.type === title);
  console.log(selectedCategories);
  const total = selectedCategories.reduce((acc, currentVal) => {
    return (acc += currentVal.amount);
  }, 0);

  console.log(total);

  const categories = title === "Income" ? incomeCategories : expenseCategories;
  selectedCategories.forEach((c) => {
    const category = categories.find((t) => t.type === c.category);
    if (category) {
      category.amount += c.amount;
    }
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);
  let chartData = {
    labels: filteredCategories.map((c) => c.type),
    datasets: [
      {
        label: "hello label",
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
  };

  // console.log(chartData.labels);

  return {
    filteredCategories,
    total,
    chartData,
  };
};

export default useTransactions;

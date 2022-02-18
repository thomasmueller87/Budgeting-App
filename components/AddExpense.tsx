import { FormEvent, MouseEventHandler, useState } from "react";
import BudgetStateInterface from "../types/BudgetStateInterface";
import Button from "./Button";

interface Props {
  onCloseAddExpense: MouseEventHandler;
  onHandleStateChange: Function;
  state: BudgetStateInterface[];
}

function AddExpense({ onCloseAddExpense, onHandleStateChange, state }: Props) {
  const initialExpense = { title: "", expense: 0 };

  const [expense, setExpense] = useState(initialExpense);
  const [category, setCategory] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    let inputValue: string | number = event.currentTarget.value;
    if (event.currentTarget.name === "expense") {
      inputValue = inputValue === "" ? "" : parseFloat(inputValue);
    }
    setExpense({ ...expense, [event.currentTarget.name]: inputValue });
    console.log(expense);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedBudgets = state.map((budget) => {
      if (budget.category === category) {
        budget.individualExpenses.push(expense);
      }
      return budget;
    });
    onHandleStateChange(updatedBudgets);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onCloseAddExpense}
      ></div>
      <div className="container absolute flex justify-center align-middle top-8">
        <div className="gap-8 relative z-20 bg-white rounded-2xl py-8 px-16 shadow-xl ring-1 flex flex-col sm:w-10/12 md:w-6/12">
          <h2 className="text-2xl font-bold">New Expense</h2>
          <div>
            <label htmlFor="title" className="block">
              Description
            </label>
            <input
              id="title"
              name="title"
              value={expense.title}
              type="text"
              className="border-black border rounded-2xl border-solid p-1 w-full"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="expense" className="block">
              Amount
            </label>
            <input
              id="expense"
              name="expense"
              value={expense.expense}
              type="number"
              className="border-black border rounded-2xl border-solid p-1 w-full"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block">
              Budget
            </label>
            <select
              id="category"
              name="category"
              className="border-black border rounded-2xl border-solid p-2 w-full"
              onChange={(event) => setCategory(event?.target.value)}
            >
              <option>–– Select Category ––</option>
              {state.map((budget) => (
                <option value={budget.category}>{budget.category}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" primary>
              Add
            </Button>
            <Button onClick={onCloseAddExpense}>Close</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddExpense;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaToEdit, setPizzaToEdit] = useState(null);

  // Fetch pizzas on mount
  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  // Handle form submission (both adding and editing)
  function handleFormSubmit(updatedPizza) {
    if (updatedPizza.id) {
      // Edit existing pizza (PATCH request)
      fetch(`http://localhost:3001/pizzas/${updatedPizza.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPizza),
      })
        .then((res) => res.json())
        .then((newPizza) => {
          setPizzas((prevPizzas) =>
            prevPizzas.map((pizza) =>
              pizza.id === newPizza.id ? newPizza : pizza
            )
          );
          setPizzaToEdit(null); // Clear the edit state
        });
    } else {
      // Add new pizza (POST request)
      fetch("http://localhost:3001/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPizza),
      })
        .then((res) => res.json())
        .then((newPizza) => {
          setPizzas((prevPizzas) => [...prevPizzas, newPizza]);
        });
    }
  }

  return (
    <>
      <Header />
      <PizzaForm pizzaToEdit={pizzaToEdit} onSubmit={handleFormSubmit} />
      <PizzaList pizzas={pizzas} setPizzaToEdit={setPizzaToEdit} />
    </>
  );
}

export default App;

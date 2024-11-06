import React, { useState, useEffect } from "react";

function PizzaForm({ pizzaToEdit, onSubmit }) {
  const [formData, setFormData] = useState({
    topping: "",
    size: "Small",
    vegetarian: false,
  });

  // Update formData whenever pizzaToEdit changes (for editing a pizza)
  useEffect(() => {
    if (pizzaToEdit) {
      setFormData({
        topping: pizzaToEdit.topping,
        size: pizzaToEdit.size,
        vegetarian: pizzaToEdit.vegetarian,
      });
    } else {
      // Reset formData if no pizzaToEdit (for adding new pizza)
      setFormData({
        topping: "",
        size: "Small",
        vegetarian: false,
      });
    }
  }, [pizzaToEdit]);

  // Handle input changes for form fields
  function handleChange(e) {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value === "Vegetarian" : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (pizzaToEdit) {
      onSubmit({ ...formData, id: pizzaToEdit.id });
    } else {
      onSubmit({ ...formData });
    }

    // Clear the form after submission
    setFormData({
      topping: "",
      size: "Small",
      vegetarian: false,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={formData.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formData.vegetarian === true}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={formData.vegetarian === false}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            {pizzaToEdit ? "Update Pizza" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;

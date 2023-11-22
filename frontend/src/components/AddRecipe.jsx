import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { toggleBoolean } from "../utils";
import "./AddRecipe.css";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ingredient section ////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Ingredient({ ingredient, index, removeIngredient }) {

  return (
    <div
      className="ingredient"
    // style={{ textDecoration: ingredient.completed ? "line-through" : "" }}
    >
      {ingredient.amount > 1 ? (ingredient.amount + " " + ingredient.amtType + "s of " + ingredient.title) : (ingredient.amount + " " + ingredient.amtType + " of " + ingredient.title)}

      <button style={{ background: "red" }} onClick={() => removeIngredient(index)}>x</button>
      {/* <button onClick={() => completeIngredient(index)}>Complete</button> */}

    </div>
  );
}

function CreateIngredient({ addIngredient }) {
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [amtType, setAmountType] = useState("tsp");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    // w.preventDefault();
    if (!amount) return;
    console.log("CreateIngredient: " + amount + " " + amtType + " of " + value)
    addIngredient(value, amount, amtType);
    setValue("");
    setAmount("");
  }
  return (
    <form onSubmit={handleSubmit} className="addIngrTab">
      <input
        type="text"
        className="input"
        style={{ width: "100px", margin: "2.5px", borderRadius: "5px", height: "40px" }}
        value={amount}
        placeholder="Amount"
        onChange={e => setAmount(e.target.value)}
      />
      <select
        defaultValue={"tsp"}
        style={{ margin: "2.5px", borderRadius: "5px", height: "40px" }}
        onChange={e => setAmountType(e.target.value)}
      >
        <option>tsp</option>
        <option>Tbsp</option>
        <option>cup</option>
        <option>gram</option>

      </select>
      <div style={{ margin: "5px" }}>
        of
      </div>
      <input
        type="text"
        className="input"
        style={{ margin: "2.5px", borderRadius: "5px", height: "40px" }}
        value={value}
        placeholder="Add a new ingredient"
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit"
        style={{ width: "50px", margin: "2.5px", borderRadius: "5px", height: "40px", background: "red", color: "white" }}>Add</button>
    </form>

  );
}
const options = [
  { value: 'Tbsp', label: 'Tbsp' },
  { value: 'tsp', label: 'tsp' },
  { value: 'cup', label: 'cup' },
  { value: 'grams', label: 'grams' }
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Steps section /////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Step({ step, indexStep, removeStep }) {

  return (
    <div> stepNum: {step.num}
      <div
        className="step"
      // style={{ textDecoration: step.completed ? "line-through" : "" }}
      >
        {step.title}

        <button style={{ background: "red" }} onClick={() => removeStep(indexStep)}>x</button>
        {/* <button onClick={() => completeStep(indexStep)}>Complete</button> */}

      </div></div>
  );
}

function CreateStep({ addStep }) {
  const [value, setValue] = useState("");
  const [stepNum, setStepNum] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addStep(value, stepNum);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="addStepTab">
      <select onChange={e => setStepNum(e.target.value)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <textarea
        type="text"
        className="input"
        style={{ margin: "2.5px", borderRadius: "5px", minHeight: "40px", minWidth: "70%" }}
        value={value}
        placeholder="Add a new step"
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit"
        style={{ width: "50px", margin: "2.5px", borderRadius: "5px", height: "40px", background: "red", color: "white" }}>Add</button>
    </form>

  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main section //////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function AddRecipe() {

  // Ingredients

  const [ingredientsAdded, setingredientsAdded] = useState(0);
  const [stepsCounter, setStepsCounter] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => { setingredientsAdded(ingredients.length) });


  const addIngredient = (title, amount, amtType) => {
    const newIngredients = [...ingredients, { title, amount, amtType }];
    setIngredients(newIngredients);
    console.log(newIngredients);
  };

  const removeIngredient = index => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Steps

  const [stepsAdded, setstepsAdded] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => { setStepsCounter(steps.length) });


  const addStep = (title, num) => {
    const newSteps = [...steps, { title, num }];
    setSteps(newSteps);
    console.log(newSteps);
  };

  const removeStep = index => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  // Main

  return (
    <div>
      <h1>Add Recipe</h1>

      {/* Ingredients */}

      <div className="header">Ingredients ({ingredientsAdded})</div>
      <div className="ingredients">
        {ingredients.map((ingredient, index) => (
          <Ingredient
            ingredient={ingredient}
            index={index}
            removeIngredient={removeIngredient}
            key={index}
          />
        ))}
      </div>
      <div className="create-ingredient" >
        <CreateIngredient addIngredient={addIngredient} />
      </div>

      {/* Steps */}

      <div className="header">Steps ({stepsCounter})</div>
      <div className="steps">
        {steps.map((step, indexStep) => (
          <Step
            step={step}
            indexStep={indexStep}
            removeStep={removeStep}
            key={indexStep}
          />
        ))}
      </div>
      <div className="create-step" >
        <CreateStep addStep={addStep} />
      </div>




    </div>
  );
}
import React from "react";
import { states } from "../data/states.js";

function StateSelect({ value, onChange }) {
  const options = states.map((state) => (
    <option key={state.abbreviation} value={state.abbreviation}>
      {state.name}
    </option>
  ));

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options}
    </select>
  );
}

export default StateSelect;
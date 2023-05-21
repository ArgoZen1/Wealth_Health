import React from "react";

const Datepicker = ({ label, value, onChange }) => {
  const handleDateChange = (e) => {
    // Transmettez seulement la valeur de l'input
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input type="date" value={value} onChange={handleDateChange} />
    </div>
  );
};

export default Datepicker;
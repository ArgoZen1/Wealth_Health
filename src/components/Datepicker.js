import React from "react";

const Datepicker = ({ label, value, onChange }) => {

  const handleDateChange = (e) => {
    onChange(e);
  };

  return (
    <div>
      <label>{label}:</label>
      <input type="date" value={value} onChange={handleDateChange} />
    </div>
  );
};

export default Datepicker;
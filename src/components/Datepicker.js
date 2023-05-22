import React from "react";

const Datepicker = ({ label, value, onChange, error }) => {
  const handleDateChange = (e) => {

    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input type="date" value={value} onChange={handleDateChange} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Datepicker;
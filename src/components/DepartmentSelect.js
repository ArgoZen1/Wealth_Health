import React from "react";

function DepartmentSelect({ value, onChange }) {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  return (
    <select name="department" id="department" value={value} onChange={(e) => onChange(e.target.value)}>
      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}

export default DepartmentSelect;
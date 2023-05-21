import React from "react";

function DepartmentSelect({ value, onChange }) {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  return (
    <select name="department" id="department" value={value} onChange={onChange}>
      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}

export default DepartmentSelect;
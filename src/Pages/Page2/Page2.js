import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import "./Page2.css"

const Page2 = () => {
  // Récupérez la liste des employés à partir du contexte
  const { employeeData } = useContext(EmployeeContext);

  // État pour le terme de recherche
  const [searchTerm, setSearchTerm] = useState('');

  // État pour le nombre d'entrées par page et la page actuelle
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les données des employés basées sur le terme de recherche
  const filteredEmployees = searchTerm.length > 1 ? employeeData.filter(employee =>
    Object.values(employee).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  ) : employeeData;

  // Calculer le nombre total de pages
  const pageCount = Math.ceil(filteredEmployees.length / perPage);

  // Obtenir les employés pour la page actuelle
  const employeesOnPage = filteredEmployees.slice((currentPage - 1) * perPage, currentPage * perPage);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, pageCount));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const onPerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / perPage) * perPage;
    return new Array(pageCount).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select className='select-number' value={perPage} onChange={onPerPageChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {employeesOnPage.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredEmployees.length)} of {filteredEmployees.length} entries
      </p>

      <div className='container-button-pre-next'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={currentPage === item ? 'active' : null}
          >
            <span>{item}</span>
          </button>
        ))}

        <button onClick={goToNextPage} disabled={currentPage === pageCount}>Next</button>
      </div>
    </div>
  );
};

export default Page2;
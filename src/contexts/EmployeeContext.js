import { createContext, useState, useEffect } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employeeData, setEmployeeData] = useState([]);

    // Charger les employés à partir de localStorage lorsque le composant est monté
    useEffect(() => {
        const storedEmployees = localStorage.getItem('employeeData');
        if (storedEmployees) {
            setEmployeeData(JSON.parse(storedEmployees));
        }
    }, []);

    // Mettre à jour localStorage chaque fois que les employés changent
    useEffect(() => {
        if (employeeData.length > 0) {
            console.log('Mise à jour des employés dans le localStorage :', employeeData);
            localStorage.setItem('employeeData', JSON.stringify(employeeData));
        }
    }, [employeeData]);

    const addEmployee = (employee) => {
        setEmployeeData([...employeeData, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employeeData, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
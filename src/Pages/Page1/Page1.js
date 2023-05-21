import React, { useState, useContext, useEffect } from 'react';
import Datepicker from '../../components/Datepicker';
import StateSelect from '../../components/StateSelect';
import { states } from '../../data/states';
import DepartmentSelect from '../../components/DepartmentSelect';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Modal from '../../components/Modal/Modal.js';
import "./Page1.css";

const Page1 = () => {

  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [department, setDepartment] = useState('');
  const [state, setState] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);  // Ajoutez ceci pour gérer l'état de la modal

  useEffect(() => {
    if (departments.length > 0) {
      setDepartment(departments[0]);
    } else {
      setDepartment('Default Department');
    }
  }, []);

  useEffect(() => {
    if (states.length > 0) {
      setState(states[0].name);
    } else {
      setState('Default State');
    }
  }, []);

  const { addEmployee } = useContext(EmployeeContext);

  const handleDateChange = (e) => {
    console.log('New Start Date:', e.target.value);
    setStartDate(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    console.log('New Birth Date:', e.target.value);
    setDateOfBirth(e.target.value);
  };

  const handleChange = (event) => {
    console.log('New Department:', event.target.value);
    setDepartment(event.target.value);
  };

  const setStateValue = (e) => {
    console.log('New State:', e.target.value);
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEmployee({
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      street,
      city,
      state,
      zipCode
    });

    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='container-global'>
      <section className='section-form'>
        <div className='container-form'>
          <h2>Create Employee</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='container_first'>
                <label>
                  First Name:
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                  Last Name:
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <div className='container-date'>
                  <Datepicker label="Date of Birth " value={dateOfBirth} onChange={handleBirthDateChange} />
                  <br />
                  <Datepicker label="Start Date " value={startDate} onChange={handleDateChange} />
                </div>
              </div>
              <div className='container_adress'>
                <h3>Address</h3>
                <label>
                  Street:
                  <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                </label>
                <br />
                <label>
                  City:
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <br />
                <label>
                  State:
                  <StateSelect value={state} onChange={setStateValue} />
                </label>
                <br />
                <label>
                  Zip Code:
                  <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </label>
                <br />
                <h4>Department</h4>
                <label>
                  Department:
                  <DepartmentSelect value={department} onChange={handleChange} />
                </label>
              </div>
            </div>
            <div className='container-button'>
              <button className='button-page1' type='submit'>Save</button>
            </div>
          </form>
        </div>
      </section>
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Employee <em>Created</em> !</h2>
      </Modal>
    </div>
  );
};

export default Page1;

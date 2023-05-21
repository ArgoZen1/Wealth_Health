import React, { useReducer, useContext, useEffect } from 'react';
import Datepicker from '../../components/Datepicker';
import StateSelect from '../../components/StateSelect';
import { states } from '../../data/states';
import DepartmentSelect from '../../components/DepartmentSelect';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Modal from '../../components/Modal/Modal.js';
import "./Page1.css";

// L'état initial du formulaire
const initialState = {
  firstName: '',
  lastName: '',
  city: '',
  street: '',
  zipCode: '',
  dateOfBirth: new Date().toISOString().split('T')[0],
  startDate: new Date().toISOString().split('T')[0],
  department: '',
  state: '',
  modalIsOpen: false,
};

// Le réducteur qui gère les actions d'état.
function reducer(state, action) {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.field]: action.value };
    case 'setModal':
      return { ...state, modalIsOpen: action.isOpen };
    default:
      return state;
  }
}

const Page1 = () => {
  // Définition des départements
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  // Utilisation de useReducer pour gérer l'état du formulaire
  const [state, dispatch] = useReducer(reducer, initialState);

  // Utilisation du contexte des employés pour ajouter un nouvel employé
  const { addEmployee } = useContext(EmployeeContext);

  // Au montage du composant, nous définissons les valeurs par défaut de départment et de state dans le formulaire
  useEffect(() => {
    dispatch({ type: 'setField', field: 'department', value: departments[0] || 'Default Department' });
    dispatch({ type: 'setField', field: 'state', value: states.length > 0 ? states[0].name : 'Default State' });
  }, []);

  // Un gestionnaire générique pour gérer les changements de champ de formulaire
  const handleChange = (field, value) => {
    dispatch({ type: 'setField', field, value });
  };

  // Un gestionnaire pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajoute l'employé en utilisant le contexte des employés
    addEmployee({
      firstName: state.firstName,
      lastName: state.lastName,
      dateOfBirth: state.dateOfBirth,
      startDate: state.startDate,
      department: state.department,
      street: state.street,
      city: state.city,
      state: state.state,
      zipCode: state.zipCode,
    });

    // Ouvre la modal pour indiquer que l'employé a été ajouté
    dispatch({ type: 'setModal', isOpen: true });
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    dispatch({ type: 'setModal', isOpen: false });
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
                  <input type="text" value={state.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                </label>
                <br />
                <label>
                  Last Name:
                  <input type="text" value={state.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                </label>
                <div className='container-date'>
                  <Datepicker label="Date of Birth " value={state.dateOfBirth} onChange={(date) => handleChange('dateOfBirth', date)} />
                  <br />
                  <Datepicker label="Start Date " value={state.startDate} onChange={(value) => handleChange('startDate', value)} />
                </div>
              </div>
              <div className='container_adress'>
                <h3>Address</h3>
                <label>
                  Street:
                  <input type="text" value={state.street} onChange={(e) => handleChange('street', e.target.value)} />
                </label>
                <br />
                <label>
                  City:
                  <input type="text" value={state.city} onChange={(e) => handleChange('city', e.target.value)} />
                </label>
                <br />
                <label>
                  State:
                  <StateSelect value={state.state} onChange={(selectedOption) => handleChange('state', selectedOption.value)} />
                </label>
                <br />
                <label>
                  Zip Code:
                  <input type="text" value={state.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} />
                </label>
                <br />
                <h4>Department</h4>
                <label>
                  Department:
                  <DepartmentSelect value={state.department} onChange={(selectedOption) => handleChange('department', selectedOption.value)} />
                </label>
              </div>
            </div>
            <div className='container-button'>
              <button className='button-page1' type='submit'>Save</button>
            </div>
          </form>
        </div>
      </section>
      <Modal isOpen={state.modalIsOpen} onClose={closeModal}>
        <h2>Employee <em>Created</em> !</h2>
      </Modal>
    </div>
  );
};

export default Page1;

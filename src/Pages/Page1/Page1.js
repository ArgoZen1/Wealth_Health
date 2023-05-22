import React, { useReducer, useContext, useEffect } from 'react';
import { states } from '../../data/states';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Modal from '../../components/Modal/Modal.js';
import "./Page1.css";
import PersonalForm from '../../components/PersonalForm';
import AddressForm from '../../components/AddressForm';
import DepartmentSelect from '../../components/DepartmentSelect';
import { validateField } from '../../utils/formValidation';
import { initialState } from '../../utils/initialState';


function reducer(state, action) {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.field]: action.value };
    case 'setFieldError':
      return { ...state, errors: { ...state.errors, [action.field]: action.value } };
    case 'setModal':
      return { ...state, modalIsOpen: action.isOpen };
    default:
      return state;
  }
}

const Page1 = () => {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  const [state, dispatch] = useReducer(reducer, initialState);
  const { addEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    dispatch({ type: 'setField', field: 'department', value: departments[0] || 'Default Department' });
    dispatch({ type: 'setField', field: 'state', value: states.length > 0 ? states[0].name : 'Default State' });
  }, []);

  const handleChange = (field, value) => {
    const error = validateField(field, value);
    dispatch({ type: 'setFieldError', field, value: error });
    dispatch({ type: 'setField', field, value });
  };

  const areRequiredFieldsFilled = (state) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'startDate',
      'department',
      'street',
      'city',
      'state',
      'zipCode'
    ];
    return requiredFields.every(field => Boolean(state[field]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(state).forEach(field => {
      const error = validateField(field, state[field]);
      dispatch({ type: 'setFieldError', field, value: error });
    });

    const errorValues = Object.values(state.errors);
    const errorExists = errorValues.some(errorValue => errorValue !== null);

    if (!errorExists && areRequiredFieldsFilled(state)) {
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
      dispatch({ type: 'reset' });
      dispatch({ type: 'setModal', isOpen: true });
    }
  };

  const closeModal = () => {
    dispatch({ type: 'setModal', isOpen: false });
  };

  return (
    <div className='container-global'>
      <section className='section-form'>
        <div className='container-form'>
          <h2>Create Employee</h2>
          <form onSubmit={handleSubmit}>
            <PersonalForm state={state} handleChange={handleChange} errors={state.errors} />
            <AddressForm state={state} handleChange={handleChange} errors={state.errors} />
            Department:
            <DepartmentSelect value={state.department} onChange={(value) => handleChange('department', value)} />
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

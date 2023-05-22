const dateIsoString = new Date().toISOString().split('T')[0];

export const initialState = {
    firstName: '',
    lastName: '',
    city: '',
    street: '',
    zipCode: '',
    dateOfBirth: dateIsoString,
    startDate: dateIsoString,
    department: '',
    state: '',
    modalIsOpen: false,
    errors: {
        firstName: null,
        lastName: null,
        city: null,
        street: null,
        zipCode: null,
        dateOfBirth: null,
        startDate: null,
        department: null,
        state: null,
    },
};
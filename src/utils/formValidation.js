export const validateField = (field, value) => {
    const trimmedValue = getTrimmedValue(field, value);

    switch (field) {
        case 'firstName':
        case 'lastName':
            return validateName(trimmedValue);
        case 'street':
        case 'city':
            return validateMinLength(trimmedValue, 2);
        case 'zipCode':
            return validateZipCode(trimmedValue);
        case 'dateOfBirth':
        case 'startDate':
            return validateDate(trimmedValue);
        default:
            return null;
    }
};

const getTrimmedValue = (field, value) => {
    if (typeof value === 'string') {
        return field === 'dateOfBirth' || field === 'startDate' ? value : value.replace(/\s+/g, ' ').trim();
    }
    return value;
};

const validateName = (value) => {
    if (value.length < 2) {
        return 'This field requires at least 2 characters*';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/i.test(value)) {
        return 'This field should only contain letters and accents*';
    }
    return null;
};

const validateMinLength = (value, minLength) => {
    if (value.length < minLength) {
        return 'This field requires at least 2 characters*';
    }
    return null;
};

const validateZipCode = (value) => {
    if (!/^[0-9]{5}$/.test(value)) {
        return 'Please enter a valid zip code*';
    }
    return null;
};

const validateDate = (value) => {
    if (!Date.parse(value)) {
        return 'Please enter a valid date*';
    }
    return null;
};
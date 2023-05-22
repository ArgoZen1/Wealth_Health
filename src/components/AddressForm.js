import React from 'react';
import StateSelect from './StateSelect';

const AddressForm = ({ state, handleChange, errors }) => {
    return (
        <div className='container_adress'>
            <h3>Address</h3>
            <label>
                Street:
                <input type="text" value={state.street} onChange={(e) => handleChange('street', e.target.value)} />
                {errors.street && <div className="error">{errors.street}</div>}
            </label>
            <br />
            <label>
                City:
                <input type="text" value={state.city} onChange={(e) => handleChange('city', e.target.value)} />
                {errors.city && <div className="error">{errors.city}</div>}
            </label>
            <br />
            <label>
                State:
                <StateSelect value={state.state} onChange={(value) => { console.log(value); handleChange('state', value) }} />
                {errors.state && <div className="error">{errors.state}</div>}
            </label>
            <br />
            <label>
                Zip Code:
                <input type="text" value={state.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} />
                {errors.zipCode && <div className="error">{errors.zipCode}</div>}
            </label>
        </div>
    );
};

export default AddressForm;
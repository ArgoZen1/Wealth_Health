import React from "react";
import Datepicker from "./Datepicker";

const PersonalForm = ({ state, handleChange, errors }) => {
    return (
        <div className='container_first'>
            <label>
                First Name:
                <input type="text" value={state.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                {errors.firstName && <div className="error">{errors.firstName}</div>}
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" value={state.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                {errors.lastName && <div className="error">{errors.lastName}</div>}
            </label>
            <div className='container-date'>
                <Datepicker
                    label="Date of Birth "
                    value={state.dateOfBirth}
                    onChange={(date) => handleChange('dateOfBirth', date)}
                    error={errors.dateOfBirth}
                />
                <br />
                <Datepicker
                    label="Start Date "
                    value={state.startDate}
                    onChange={(value) => handleChange('startDate', value)}
                    error={errors.startDate}
                />
            </div>
        </div>
    );
};

export default PersonalForm;
import React from 'react';


const InputField = ({
  type, name, placeholder, error, value, onChange, label
}) => (
    <div
        className={ `form-group ${error ? 'has-error' : ''}` }
    >
        <label
            htmlFor= { name }
            className="control-label" >

            { label }

        </label>

        <input
            id=""
            value={ value }
            onChange={ onChange }
            type= { type }
            name= { name }
            className="form-control"
            placeholder= { placeholder }
            required=""
            autoFocus=""
        />

        <br />
    </div>
);

export default InputField;

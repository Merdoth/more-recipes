import React from 'react';
import { PropTypes } from 'prop-types';

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  label,
  required
}) => (
  <div className="input-field buttonb">
    <label htmlFor={name} className="control-label">
      {label}
    </label>

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-control"
      required={required}
      style={{
        border: '0',
        outline: '0',
        background: 'transparent',
        borderBottom: '1px solid black',
        borderRadius: '3px'
      }}
    />
  </div>
);

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;

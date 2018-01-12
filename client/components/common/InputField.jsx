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
  <div className="input-field">
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
    />

    <br />
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

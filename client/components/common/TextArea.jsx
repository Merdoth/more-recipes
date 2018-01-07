import React from 'react';

const TextArea = ({
  name, placeholder, label, value, error, onChange
}) => (
  <div className={`form-group ${error ? 'has-error' : ''}`}>
    <label htmlFor={name} className="control-label">
      {label}
    </label>

    <textarea
      id=""
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-control"
    />
    <br />
    <br />
  </div>
);

export default TextArea;

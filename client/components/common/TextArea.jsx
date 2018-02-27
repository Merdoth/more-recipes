import React from 'react';


/**
 *
 * @description Helper component that renders TextArea
 *
 * @method Button
 *
 * @param { Object } props
 *
 * @returns { undefined }
 *
 */
const TextArea = ({
  name,
  placeholder,
  label,
  value,
  error,
  onChange
}) => (
  <div className={`form-group ${error ? 'has-error' : ''} buttonb`}>
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
  </div>
);

export default TextArea;

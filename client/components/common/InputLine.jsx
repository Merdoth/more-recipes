import React from 'react';

/**
 *
 * @description Helper component that renders an InputLine
 *
 * @method Button
 *
 * @param { Object } props
 *
 * @returns { undefined }
 *
 */
const InputLine = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className
}) => (
  <span className='inputLine'>
    <input
      id=""
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      className={ className }
      placeholder={placeholder}
    />
  </span>
);

export default InputLine;

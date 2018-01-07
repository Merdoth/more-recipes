import React from 'react';

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

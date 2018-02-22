import React from 'react';

/**
 *
 * @description Helper component that renders a button
 *
 * @method Button
 *
 * @param { Object } props
 *
 * @returns { undefined }
 *
 */
const Button = ({
  id,
  type, onClick, disabled, name, iconClass, className,
}) => (
    <div
      className='form-group '
    >

      <button
        id={ id }
        onClick={ onClick }
        type={ type }
        className={ className}
        disabled={ disabled }
        name={ name }
      >
     <i className={`fa ${iconClass}`} ></i> { name }
     </button>
    </div>
);

export default Button;

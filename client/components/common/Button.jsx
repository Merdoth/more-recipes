import React from 'react';


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

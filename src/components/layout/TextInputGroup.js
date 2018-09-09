import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInputGroup = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required
}) => {
  return(
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={
          classNames("form-control form-control-lg", {
            "is-invalid": required
          })
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="invalid-feedback"> 
        {required}
      </div>
    </div>
  );
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.string.isRequired
};

TextInputGroup.defaultProps = {
  type: 'text'
}; 

export default TextInputGroup;
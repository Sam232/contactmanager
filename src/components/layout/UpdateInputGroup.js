import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const UpdateInputGroup = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
  error
}) => {
  return(
    <div>
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input className={classNames("form-control form-lg", {
          "is-invalid": error
        })} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
        <div className="invalid-feedback">
          {error}
        </div>
      </div>
    </div>
  );
}

UpdateInputGroup.defaultProps = {
  type: 'text'
}; 

UpdateInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
}

export default UpdateInputGroup;
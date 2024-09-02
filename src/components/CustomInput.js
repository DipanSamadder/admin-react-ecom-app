import React from "react";

const CustomInput = (props) => {
  const { type, className, id, label, labelShow } = props;
  return (
    <div className="mb-3">
      {labelShow === true && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}

      <input
        type={type}
        className={` form-control ${className}`}
        id={id}
        placeholder={label}
      />
    </div>
  );
};

export default CustomInput;

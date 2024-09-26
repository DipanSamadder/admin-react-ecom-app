import React from "react";

const CustomInput = (props) => {
  const { type, className, id, label, name, labelShow, value, onChange } =
    props;
  return (
    <div className="mt-3">
      {labelShow === true && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}

      <input
        type={type}
        className={` form-control ${className}`}
        id={id}
        name={id}
        placeholder={labelShow === false ? label : ""}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;

import React from "react";

const CustomTextArea = (props) => {
  const { type, className, id, label, labelShow } = props;
  return (
    <div className="mb-3">
      {labelShow === true && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}

      <textarea
        className={` form-control ${className}`}
        id={id}
        placeholder={label}
      ></textarea>
    </div>
  );
};

export default CustomTextArea;

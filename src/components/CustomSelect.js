import React from "react";

const CustomSelect = (props) => {
  const { className, id, label, labelShow = true, dataOption } = props;
  return (
    <div className="mb-3">
      {labelShow === true && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}

      <select className={` form-control ${className}`} id={id}>
        <option>Select {label}</option>
        {dataOption &&
          dataOption.map((items, key) => (
            <option key={key} value={items.key}>
              {items.value}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CustomSelect;

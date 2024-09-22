import React from "react";

const CustomSelect = (props) => {
  const { className, id, label, labelShow = true, dataOption , name, onChange, value} = props;
  const classNew = className? className :'';
  return (
    <div className="mt-3">
      {labelShow === true && (
        <label htmlFor={label} className="form-label">
          {label}
        </label>
      )}

      <select className={` form-control ${classNew}`} id={id} name={name} onChange={onChange} defaultValue={value}>
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

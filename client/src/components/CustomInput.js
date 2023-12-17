import React from "react";
const CustomInput = ({
  type,
  label,
  id,
  i_class,
  name,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
};

export default CustomInput;

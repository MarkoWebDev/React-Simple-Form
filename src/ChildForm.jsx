import React from "react";
import "./ChildForm.css";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";

const ChildForm = ({ label, placeholder, onChange, ...inputFields }) => {
  return (
    <div className="child-form">
      <FormLabel>{label}</FormLabel>
      <div className="child-inputs">
        <TextField
          placeholder={placeholder}
          label={label}
          onChange={onChange}
          {...inputFields}
        ></TextField>
      </div>
    </div>
  );
};

export default ChildForm;

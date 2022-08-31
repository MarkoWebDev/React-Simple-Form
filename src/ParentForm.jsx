import React, { useState } from "react";
import ChildForm from "./ChildForm";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import "./ParentForm.css";
import { useEffect } from "react";

const ParentForm = () => {
  const getFromLocal = () => {
    const storage = sessionStorage.getItem("form");
    if (!storage)
      return {
        name: "",
        lastname: "",
        email: "",
        password: "",
        description: "",
        office: "2",
        send: false,
        gender: "2",
      };

    return JSON.parse(storage);
  };

  const [values, setValues] = useState(getFromLocal);

  useEffect(() => {
    sessionStorage.setItem("form", JSON.stringify(values));
  }, [values]);

  const inputs = [
    {
      id: "1",
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Name",
      pattern: "",
    },
    {
      id: "2",
      name: "lastname",
      type: "text",
      label: "LastName",
      placeholder: "lastName",
      pattern: "",
    },
    {
      id: "3",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      pattern: "",
    },
    {
      id: "4",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      pattern: "",
    },
  ];

  const [error, setError] = useState({
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form", values);
  };

  const handleClear = () => {
    setValues({
      name: "",
      lastname: "",
      email: "",
      password: "",
      date: "",
      description: "",
      office: "2",
      send: false,
      gender: "2",
    });
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  const offices = [
    { id: "0", name: "London office" },
    { id: "1", name: "Paris office" },
    { id: "2", name: "Berlin office" },
    { id: "3", name: "Rome office" },
    { id: "4", name: "Barcelona office" },
    { id: "5", name: "Other" },
  ];

  const genders = [
    { id: "0", gender: "Male" },
    { id: "1", gender: "Female" },
    { id: "2", gender: "Other" },
  ];

  return (
    <div className="form-section">
      <FormGroup>
        <div className="form-group">
          {inputs.map((item) => {
            return (
              <ChildForm
                key={item.id}
                id={item.name}
                name={item.name}
                label={item.label}
                value={values[item.name]}
                {...item}
                onChange={onChange}
              ></ChildForm>
            );
          })}
          <div className="form">
            <TextField
              label="Multiline"
              name="description"
              value={values.description}
              multiline
              rows={4}
              variant="standard"
              onChange={onChange}
            ></TextField>
            {error.description && <p className="error">{error.description}</p>}
            <Select name="office" onChange={onChange} value={values.office}>
              {offices.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormControlLabel
              label="Send"
              name="send"
              value={values.send}
              onChange={onChange}
              control={
                <Checkbox
                  value={values.send}
                  checked={values.send === true}
                ></Checkbox>
              }
            />
            <div className="gender">
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name={values.gender}
                value={values.gender}
                onChange={onChange}
              >
                {genders.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      label={item.gender}
                      name="gender"
                      control={<Radio></Radio>}
                    >
                      {item.gender}
                    </FormControlLabel>
                  );
                })}
              </RadioGroup>{" "}
            </div>
          </div>
          <div className="form-buttons">
            <div className="form-submit">
              <Button variant="contained" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <Button
              color="error"
              variant="contained"
              type="submit"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </FormGroup>
    </div>
  );
};

export default ParentForm;

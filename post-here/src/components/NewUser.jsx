import React, { useState, useEffect } from "react";
import axios from "axios";
import NewUserSchema from "./NewUserSchema";
import * as yup from "yup";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  email: "",
  password: "",
};

function NewUser(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    yup
      .reach(NewUserSchema, name)
      .validate(event.target.value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //what do with login information object?
    console.log(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="newUser">
      <form className="createAccount" onSubmit={onSubmit}>
        <h2>Create An Account</h2>
        <div className='errors'>{formErrors.username}</div>
        <div className="errors">{formErrors.email}</div>
        <div className="errors">{formErrors.password}</div>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formValues.newPassword}
            onChange={onInputChange}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </div>
  );
}
export default NewUser;

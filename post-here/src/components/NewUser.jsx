import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import NewUserSchema from "./NewUserSchema";
import * as yup from "yup";

const initialFormValues = {
  username: "",
  // email: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  // email: "",
  password: "",
};

function NewUser(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const { push } = useHistory();

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

    axiosWithAuth()
      .post('api/auth/register', formValues)
      .then(res => {
        console.log(res);
        push('/post-input');
      })
      .catch(err => console.log(err))
    //what do with login information object?
    // console.log(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="newUser">
      <form className="createAccount" onSubmit={onSubmit}>
        <h2>Create An Account</h2>
        <div className='errors'>{formErrors.username}</div>
        {/* <div className="errors">{formErrors.email}</div> */}
        <div className="errors">{formErrors.password}</div>
        <label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Create Username"
            value={formValues.username}
            onChange={onInputChange}
          />
        </label>
        {/* <label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={onInputChange}
          />
        </label> */}
        <label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Create Password"
            value={formValues.password}
            onChange={onInputChange}
          />
        </label>
        <button id="sign-up">Sign Up</button>
      </form>
    </div>
  );
}
export default NewUser;

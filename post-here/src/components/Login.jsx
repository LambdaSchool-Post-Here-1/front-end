import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import loginSchema from "./LoginSchema";
import * as yup from 'yup';
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialFormValues = {
  username: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  password: "",
}

function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const { push } = useHistory();

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    yup
    .reach(loginSchema, name)
    .validate(event.target.value)
    .then(valid => {
      setFormErrors({
        ...formErrors, [name]: ""
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]:err.errors[0]
      })
    })

    setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //what do with login information object?
    axiosWithAuth()
      .post("https://post-here-heroku.herokuapp.com/api/auth/login", formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        push('/post-input');
      })
      .catch((err) => {
        console.log("error")
      });
    // console.log(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="login">
      <form className="formContainer" onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="errors">{formErrors.username}</div>
        <div className="errors">{formErrors.password}</div>
        <label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={onInputChange}
          />
        </label>

        <button id="login">Login</button>
      </form>
    </div>
  );
}

export default Login;

/// --> all the posts the users have made 'https://post-here-heroku.herokuapp.com/api/reddit'
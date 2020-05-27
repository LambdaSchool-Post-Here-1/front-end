import React, { useState, useEffect } from "react";
import axios from "axios";

const initialFormValues = {
  username: "",
  password: "",
};

function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //what do with login information object?
    axios
      .post("https://post-here-heroku.herokuapp.com/api/auth/login", formValues)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log("error")
      });
    console.log(formValues);
    setFormValues(initialFormValues);
  };

  return (
    <div className="login">
      <form className="formContainer" onSubmit={onSubmit}>
        <h2>Login</h2>
        <label>
          <input
            type="text"
            name="username"
            placeholder="UserName"
            value={formValues.username}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={onInputChange}
          />
        </label>

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;

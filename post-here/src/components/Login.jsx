import React, {useState} from "react";

const initialFormValues = {
  username: "",
  password: "",
};

function Login(props) {

  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const onSubmit = (event) => {
    event.preventDefault();
    //what do with login information object?
    console.log(formValues)
    setFormValues(initialFormValues)
  }

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

import React from "react";

function Login(props) {
  const { values, onInputChange, onSubmit } = props;

  return (
    <div className="login">
      <form className="formContainer" onSubmit={onSubmit}>
        <h2>Login</h2>
        <label>
          <input 
          type="text" 
          name="username" 
          placeholder="UserName"
          // value={values.username}
          // onChange={onInputChange}
          />
        </label>
        <label>
          <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          // value={values.password}
          // onChange={onInputChange}
          />
        </label>

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;

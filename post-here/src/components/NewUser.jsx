import React, { useState } from "react";

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function NewUser(props) {

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
    <div className="newUser">
      <h2>Create An Account</h2>
      <form className="createAccount" onSubmit={onSubmit}>
        <label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
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

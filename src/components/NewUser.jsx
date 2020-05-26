import React from "react";

function NewUser(props) {
  const { values, onInputChange, onSubmit } = props;
  return (
    <div className="newUser">
      <h2>Create An Account</h2>
      <form>
        <label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            // value={values.firstName}
            // onChange={onInputChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            // value={values.lastName}
            // onChange={onInputChange}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Email"
            // value={values.email}
            // onChange={onInputChange}
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            // value={values.newPassword}
            // onChange={onInputChange}
          />
        </label>
      </form>
      <button>Sign Up</button>
    </div>
  );
}

export default NewUser;

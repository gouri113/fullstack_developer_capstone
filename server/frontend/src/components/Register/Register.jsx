import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("User already exists");
    }
  };

  return (
    <div className="register_container">
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <input type="text" name="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
        <input type="text" name="firstname" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" name="lastname" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;

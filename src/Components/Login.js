import React, { useState } from 'react';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = (ev)=> {
    ev.preventDefault();
    login({ username, password });
  };
  return (
    <div>
      <h1 className="title">Login to view your account info!</h1>
      <form onSubmit={ _login }>
        <input
          placeholder='username'
          value = { username }
          onChange = { ev => setUsername(ev.target.value) }
          />
        <input
          placeholder='password'
          value={ password }
          onChange = { ev => setPassword(ev.target.value) }
        />
        <button>Login</button>
        <p class="smalltext">Don't have an account? <a href="register.html">Register</a></p>
      </form>
    </div>
  );
};

export default Login;

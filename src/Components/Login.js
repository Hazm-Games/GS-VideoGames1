import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <form onSubmit={_login }>
        <input
          placeholder='username'
          value = { username }
          onChange = { ev => setUsername(ev.target.value) }
          />
        <input
          type='password'
          placeholder='password'
          value={ password }
          onChange = { ev => setPassword(ev.target.value) }
        />
        <button className="home">Login</button>

     <p className="smalltext">Don't have an account? <Link to='/register'>Register</Link></p>


      </form>
    </div>
  );
};

export default Login;

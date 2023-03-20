import React, { useState, useNavigate } from 'react';

const Register = ({register})=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    

    function _register(ev) {
        try {
            setError('');
            ev.preventDefault();
            register({ username, password });
        }
        catch (error) {
            setError(error.message);
        }

    }
    
    return(
        <div>
            <h1 className="title">Register a new account!</h1>
            <div>{error} </div>
            <form onSubmit={_register}>
                <input
                placeholder='username'
                value={ username } 
                onChange = { ev => setUsername(ev.target.value) }
                >
                </input>
                <input
                   placeholder= 'password'
                   value={ password } 
                   type = 'password'
                   onChange = { ev => setPassword(ev.target.value) }
                >
                
                </input>

                <button type = "submit" className='home'>Register</button>
                

            </form>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';

const Register = ({register})=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const _register = (ev)=> {
        ev.preventDefault();
        register({username, password});
    };
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={_register}>
                <input
                placeholder='username'
                value={ username } 
                onChange = { ev => setUsername(ev.target.value) }
                >
                </input>
                <input
                   placeholder='password'
                   value={ password } 
                   onChange = { ev => setPassword(ev.target.value) }
                >
                
                </input>

                <button>Register</button>
                

            </form>
        </div>
    );
};

export default Register;
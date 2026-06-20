import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth.js';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader.jsx';


const Login = () => {
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
}
if (loading) {
        return <FullPageLoader text="Authenticating user..."/>;
}

return (
    <main>
        <div className="auth-form-container">
        <h1 className='form-h1-text'>
            Login
        </h1>

        <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input  
                onChange={(e)=> {setEmail(e.target.value)}} type="email" id="email" name="email" placeholder='Enter Your Email'required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input  
                onChange={(e)=> {setPassword(e.target.value)}} type="password" id="password" name="password" placeholder='Enter Your Password' required />
            </div>
            
            <button type="submit" className='primary-button'>Login</button>
            
        </form>

        <p>Don't have an account? 
          
          <Link to="/register"> Register</Link>  
        
        </p>
        
        </div>
    </main>
  )
}

export default Login

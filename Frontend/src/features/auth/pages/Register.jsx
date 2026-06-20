import React, {useState} from 'react'
import {useNavigate , Link} from "react-router-dom"
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth.js';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
    
  }

  return (
    <main>
      <div className="auth-form-container">
        <h1 className='form-h1-text'>Register</h1>

        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" placeholder='Enter Your Username' required />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='Enter Your Email' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder='Enter Your Password' required />
            </div>
            <button type="submit" className=' primary-button'>Register</button>
        </form>

        <p>Already have an account? 
          <Link to="/login"> Login </Link>  
        </p>
        
        </div>
    </main>
  )
}

export default Register;

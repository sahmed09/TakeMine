// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/Authcontext';

function Login() {
  const [username, setUsername] = useState('@students.towson.edu');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const global=useAuth()
  
  const handleLogin = async (e) => {
  
    e.preventDefault();
    
    const response=await fetch("http://127.0.0.1:5001/users/login",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
        method: "post",
        body: JSON.stringify({
          "email": username,
          "password": password
        })
      }
    )
    if(response.ok){
      response.json().then(res=>{//res un oggetto con i dati dell'utente collegato
     
      global.login(res.user)
      
      navigate("/profile/"); 
      }
      )
      
    }
    else{
      response.json().then(res=>console.log(res.message));   //stampare da qualche parte il l'errore 
    }
  
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1>Login </h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <a href="/Signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

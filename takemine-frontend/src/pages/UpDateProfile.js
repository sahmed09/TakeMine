// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function UpDateProfile({formData}) {
  const navigate = useNavigate();
  const [message,setMessage]=useState("") //error message
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =  async (e) => {
    setMessage("");
    e.preventDefault();
    console.log(formData)
    
    
    /* Add validation and API call here:
    CLIENT-SIDE (minimal checks)
    
     
    

    
   
    if(!formData.email.includes("@students.towson.edu"))
      {
        setMessage("Your email domain should be @students.towson.edu")
        return;
      }
    if (formData.password!==formData.confirmPassword)
      {
        setMessage("Your password and your confimed password should be the same")
        return;
      }

     
    

    //console.log(formData)
    const response = await fetch("http://127.0.0.1:5000/users/register", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",

      // si può anche passare il formData purchè lato-server ci sia coerenza con i nomi dei campi
      // in questo caso si può scrivere semplicemente  body: JSON.stringify(formData)  
      body: JSON.stringify(formData)
    });

    
     // se la gestistrazione è ok allora vai alla pagina di login
   // se c'è un errore allora occorre in qualche modo comunicarlo all'utente
                      // Una possibile soluzione potrebbe essere 
   
    if (response.status===201)
      
      navigate('/login');
    else
      response.json().then(r=>setMessage(r.message));
    */
  };
  

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Update your profile</h1>
          <p></p>
        </div>
        <div style={{color: "#ff0000"}}>{message}</div>  
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label> Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

           
            <div className="input-group">
              <label>TU Email Address (@students.towson.edu)</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
                required
              />
               
            </div>
            
            <div className="input-group">
              <label>Nickname</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                
                required
              />
               
            </div>
            <div className="input-group">
              <label>Date of birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                
                required
              />
               
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

           

            <div className="input-group">
              <label>Set Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>

          <button type="submit">Update Account</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}

export default UpDateProfile;

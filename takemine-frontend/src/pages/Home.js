// src/pages/Home.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../context/Authcontext';
const Home = () => {
  const global=useAuth();
  
  return (
    <div className="home-page">
      {console.log(global)}
      <section 
        className="hero-section" 
        style={{ backgroundImage: 'url(/2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
      >
        <div className="hero-overlay">
          <h1>Revolutioning Connections for Students Communities</h1>
          <p>Access, Share, and Borrow Peer-To-Peer Resources. Find Tutors, Expand Your Knowledge.</p>
          
        </div>
      </section>
 {/* Tutors Section */}
 <section className="tutors-for-you">
        <h2>Sample Help</h2>
        <div className="tutor-cards">
          <div className="tutor-card">
           
            <p>Student 1</p>
            <h3>Moving furnitures</h3>
           
          
          
        
        </div>
        
          <div className="tutor-card">
            
            <p>Student 2</p>
            <h3>Italian language lessons</h3>
           
          </div>
          
          {/* Add more tutor cards as needed */}
       
          <div className="tutor-card">
            
            <p>Student 3</p>
            <h3>Guitar lessons</h3>
           
          </div>
          
          {/* Add more tutor cards as needed */}
        </div>
      </section>
      
      {/* Available Resources Section */}
      <section className="available-resources">
        <h2>Sample Items</h2>
        <div className="resource-cards">
          <div className="resource-card">
            <img src="/1.png" alt="Resource 1" />
            <h3>Camera</h3>
            <p>Description of the resource.</p>
          
          </div>
          <div className="resource-card">
            <img src="/2.png" alt="Resource 2" />
            <h3>Books</h3>
            <p>Description of the resource.</p>
         
          </div>
          <div className="resource-card">
            <img src="/3.png" alt="Resource 3" />
            <h3>Brushes</h3>
            <p>Description of the resource.</p>
           
          </div>
         
          {/* Add more resource cards as needed */}
        </div>
      </section>


     

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are a platform dedicated to connecting students by sharing resources, finding tutors, and building a community.</p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This platform helped me find the perfect tutor for my courses!"</p>
            <h4>- John Doe, Student</h4>
          </div>
          {/* Add more testimonial cards as needed */}
        </div>
      </section>
    </div>
  );
};

export default Home;

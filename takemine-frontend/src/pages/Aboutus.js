import React from 'react';
import './Aboutus.css';

function AboutUs() {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TakeMine</h1>
          <p className="hero-description">Your University Resource Hub — Connecting Knowledge, Resources, and Students.</p>
        </div>
        <div className="hero-image">
          <img src="2.jpg" alt="University Campus" />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At TakeMine, our mission is to make learning more accessible by providing students with the best educational resources, tutors, and support systems. We aim to bridge the gap between students and the tools they need to succeed academically.</p>
      </section>

      {/* Our Core Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-list">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Constantly evolving to offer the best learning solutions for students.</p>
          </div>
          <div className="value-card">
            <h3>Collaboration</h3>
            <p>Building a strong community between students, tutors, and resources.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>Maintaining transparency and trust in all our interactions.</p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="2.jpg" alt="Team Member" />
            <h3>Giancarlo Colloca</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="2.jpg" alt="Team Member" />
            <h3>Abdul Ibrahim</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-member">
            <img src="2.jpg" alt="Team Member" />
            <h3>Shihab Ahmed</h3>
            <p>Lead Developer</p>
          </div>          
          <div className="team-member">
            <img src="2.jpg" alt="Team Member" />
            <h3>Riya Pandey</h3>
            <p> Developer</p>
          </div>
          <div className="team-member">
            <img src="2.jpg" alt="Team Member" />
            <h3>Mikiyas Semu</h3>
            <p> Developer</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <h2>Our History</h2>
        <p>Founded in 2020, TakeMine has become a trusted platform for students across the globe. Starting as a small project to help peers share textbooks, we’ve expanded to offer a full range of resources, including tutoring, academic tools, and peer-to-peer knowledge sharing.</p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Explore Resources?</h2>
        <p>Join TakeMine today and gain access to a wide range of learning materials and expert tutors. Let us help you achieve your academic goals.</p>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
}

export default AboutUs;

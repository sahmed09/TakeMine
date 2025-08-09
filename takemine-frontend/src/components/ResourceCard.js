// ResourceCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import ReactStars from 'react-stars';
import { api_getRatingById } from '../utils/api';

function ResourceCard({ resource }) {
  const {user,login,logout}=useAuth()
  
  return (
    <div key={resource.id} className="resource-card">
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <p><span>Cost: {resource.cost} <br/> <small>Zip code: {resource.location}</small></span></p>
           
            <ReactStars edit={false} half={true} value={resource.rating}  />
            <small>{resource.categories.join("-")}</small> <br />
            {user ? (
              <Link to={`/borrow/${resource.id}`} className="borrow-button">
                Details
              </Link>
            ) : (
              <Link to="/login" className="borrow-button">
                Details (Login Required)
              </Link>
            )}
          </div>
  );
}

export default ResourceCard;

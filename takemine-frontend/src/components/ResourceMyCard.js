// ResourceCard.js
import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

import { api_deleteResource, api_getRatingById } from '../utils/api';

import ReactStars from 'react-stars';

function ResourceMyCard({ resource,change }) {
  const {user,login,logout}=useAuth()
  const [rating,setRating]=useState();

   useEffect(() => {
    
    const fetchRating = async () => {
     
      const u=await api_getRatingById(resource.id);
      setRating(Number.parseFloat(u))
     
      
    };
    fetchRating();
  },[]);



  return (
    <div className="resource-card">
      <h3>{resource.name}</h3>
      <p>{resource.description}</p>
      <p>Cost: {resource.cost}</p>

     <ReactStars edit={false} half={true} value={rating}  />
     
        
      
     
     
       {user ? (
        <Link to="" className="borrow-button">
           
          <input 
              checked={resource.availability} 
              type="checkbox"
              onChange={change}
         //     onChange={()=>changeA(resource.id)}
          />
        </Link>
      ) : (
        <Link to="/login" className="borrow-button">
          Delete (Login Required)
        </Link>
      )}
      
    </div>
  );
}



export default ResourceMyCard;

// AvailableResources.js
import React, { useEffect, useState } from 'react';
import './ResourceDetails.css';
import { api_getAllBorrowsPendingBYTUID } from '../utils/api';
import { useAuth } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Resource from '../models/resourse';


const Button=(props)=>{
  const [status,useStatus]=useState(props.status)
 

  const newStatus=(status)=>{
    if( status=='Requested')
        return "Approve";
    if (status=='Approved')
        return  "Started";
    
    return "Complete";
  }

  const handle=()=>{
    console.log("handel",status)
    if( status=='Requested')
      handleApprove()
  if (status=='Approved')
      handleStart();
  
  handleComplete() 
  }

  const handleApprove=()=>{
    console.log("Approvato")

  }

  const handleComplete=()=>{
    console.log("Comleto")
  }

  const handleStart=()=>{
    console.log("Partito")
  }
  
   
  return(

    <button className="borrow-btn"
              onClick={handle}
            >{newStatus(status) }</button>
  )
}

const AvailableResources = () => {
  
  const global= useAuth();
  const [resources,setResources]=useState([]);
  console.log(global)
  useEffect(()=>{
    const loadBorrow=async ()=>{
      const data=await api_getAllBorrowsPendingBYTUID(global.user.userId)
     
      setResources(data)
    }
    loadBorrow();

  },[]);

  

  
  return (
    <>
    
    <div className="resources-page">
      <div className="resources-header">
        <h1>Pending Resources</h1>
        <div className="resources-legend">
          <span className="legend-item instock">Requested</span>
          <span className="legend-item limited">Approved</span>
          <span className="legend-item available">Started</span>
        </div>

        <div className="resources-list">
        {resources.map(resource => (
          <div key={resource.id} className={`resource-item `}>
            <h2>{resource.ResName}</h2>
            <p>Description: {resource.Description}</p>
            <p>Request By: {resource.Nickname} - <Link
            style={{color:"white"}}
            to='#'
            onClick={(e) => {
                window.location.href = "mailto:"+resource.Email
                e.preventDefault();
            }}
        >
           {resource.Email}
        </Link></p>
            <p>From: {resource.StartTime} </p>
            <p>To: {resource.EndTime} </p>
            <p className="status">Status: {resource.Status}</p>
            <div style={{display: "inline-flex"}}>
               <Button status={resource.Status} />
            
            
            </div>
          </div>
        ))}
      </div>
      </div>
    
    </div>
    </>
  );
  
};



export default AvailableResources;

/*  <div className="resources-list">
        {resources.map(resource => (
          <div key={resource.id} className={`resource-item ${resource.availability.replace(/\s/g, '').toLowerCase()}`}>
            <h2>{resource.ResName}</h2>
            <p>Category: {resource.category}</p>
            <p className="status">Status: {resource.availability}</p>
            <button className="borrow-btn">Borrow Now</button>
          </div>
        ))}
      </div> */
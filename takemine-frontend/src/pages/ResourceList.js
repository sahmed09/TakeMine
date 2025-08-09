// ResourceList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { getAllResources } from '../utils/api';
import ReactStars from 'react-stars';
import ResourceCard from '../components/ResourceCard';

// Simulated resources (this would usually come from an API)
const fakeresources = [
  { id: 1, title: 'Resource 1', description: 'Description of Resource 1' },
  { id: 2, title: 'Resource 2', description: 'Description of Resource 2' },
  { id: 3, title: 'Resource 3', description: 'Description of Resource 3' },
];

function ResourceList() {
   const [resources,setResources]=useState([]);
   const [allResources,setAllResource]=useState([])
   const [name,setName]=useState("")
   const [type,setType]=useState("");
   const [category,setCategory]=useState("");
   const [allCategories,setAllCategories]=useState([])
   const [orderBy,setOrderBy]=useState("")

   const global=useAuth();
   useEffect(()=>{

     const fetchResources=async ()=>{
      const data = await getAllResources(global.user.userId);
     
      console.log(data);
      setResources(data.filter(r=>r.TU_ID!=global.user.userId)); //delete the my resources
     
      setAllResource(data.filter(r=>r.TU_ID!=global.user.userId));
      const cats=[""];
      data.forEach(r=>r.categories.forEach(c=>{
        if(!cats.includes(c))
          cats.push(c)}));
              
                  setAllCategories(cats)
     }
      fetchResources();
     
    
   },[]

   );
   

   const filtra=(name,type,cat, ord)=>{
   
   let resourcesFiltrate=[...allResources]
    if(name!=""){
      
      resourcesFiltrate=resourcesFiltrate.filter(r=>r.name.toLowerCase().includes(name.toLowerCase()))
     
    }
    
    if(type!=""){
      console.log("type",resourcesFiltrate)
      resourcesFiltrate=resourcesFiltrate.filter(r=>r.type==type)
    }
   

    if(cat!="")
      resourcesFiltrate=resourcesFiltrate.filter(r=>r.categories.includes(cat))
   
    if(ord=="Asc")
        setResources(resourcesFiltrate.sort((a,b)=>a.rating-b.rating))
    else if(ord=="Dec")
      setResources(resourcesFiltrate.sort((a,b)=>b.rating-a.rating))
      else
      setResources(resourcesFiltrate)
    


   }

   


  const{user,login,logout}=useAuth(); // This is where you check if the user is logged in (use state or context)

  return (
    <div>
      <h1>Browse Resources</h1>
      <div>Filter by name <input type="text" value={name} onChange={(e)=>{setName(e.target.value); filtra(e.target.value,type,category,orderBy)} }></input></div>
      <div>Filter by type 
        <select onChange={(e)=>{setType(e.target.value); filtra(name,e.target.value,category, orderBy)}}>
          <option > </option>
          <option>Item</option>
          <option>Help</option>
        </select>
      </div>
      
        
        
      <div>Filter by category <select onChange={(e)=>{setCategory(e.target.value); filtra(name,type,e.target.value, orderBy)}}>
          
          {allCategories.map(c=><option key={c}>{c}</option>)}
        </select></div>

        <div>Order by rating 
        <select onChange={(e)=>{setOrderBy(e.target.value);filtra(name,type,category,e.target.value)}}>
          <option > </option>
          <option>Asc</option>
          <option>Des</option>
        </select>
      </div>

      <div className="resource-list" style={{display:"inline-flex", flexWrap: "wrap"}}>
        {resources.map((resource) => 
        <ResourceCard key={resource.id} resource={resource}/>)}
      </div>
    </div>
  );
}

export default ResourceList;

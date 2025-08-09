import { data } from 'react-router-dom';
import Resource from '../models/resourse.js';
import User from '../models/user.js'
const SERVER_URL="http://127.0.0.1:5001";

//Samples
const sampleResources = [
    {
      id: '1',
      name: 'Calculus Textbook',
      location: 'Main Library',
      description: 'Introductory calculus textbook, 5th edition',
      cost: '$50',
      availability: true,
      reviews: [
        { id: '1', user: 'John Doe', rating: 4, comment: 'Great condition, recommended!' },
        { id: '2', user: 'Jane Smith', rating: 5, comment: 'Exactly what I needed for my class.' },
      ],
    },
    {
      id: '2',
      name: 'Tutoring for Linear Algebra',
      location: 'Campus Learning Center',
      description: 'One-on-one tutoring session for linear algebra',
      cost: '$30/hour',
      availability: true,
      reviews: [
        { id: '1', user: 'Alex Johnson', rating: 5, comment: 'The tutor was extremely helpful and patient.' },
      ],
    },
    
  ];
  
  const sampleUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', resources: ['1'] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', resources: ['2'] },

  ];
  
  export const getAllResources = async (id) => {
    const response=await fetch(SERVER_URL+"/resources/search");
    
    if (response.ok){
      const result= await response.json();
      let prec=-1;
      const data=[];
      console.log(result)
      result.forEach(r => {
        const rating=r.rating==null? 0 : Number.parseFloat(r.rating)
        if(r.Res_ID!=prec)
           {
          
            data.push(new Resource(r.Res_ID,r.ResName,r.Description,r.Location,r.Availability, r.Cost, r.TU_ID, rating, r.ResourceType))
            data[data.length-1].addCategory(r.CNAME)
            prec=r.Res_ID;}
        else
        { 
          data[data.length-1].addCategory(r.CNAME)
        }
      })
     console.log("API",data)
     return data;
      
      };

}

  export const getResourceByTUID = async (id) => {
    
   
      const response=await fetch(SERVER_URL+"/resources/search/"+id);
      if (response.ok)  {
        const result = await response.json();
        return result.map(r => new Resource(r.Res_ID,r.ResName,r.Description,r.Location,
          r.Availability, r.Cost, r.TU_ID,r.rating, r.ResourceType))
        

        
      
      
    }
  };
  
  export const getResourceById = async (id) => {
   
    const response=await fetch(SERVER_URL+"/resources/"+id)
     if (response.ok)
      {const r = await response.json();
       
          const result= new Resource(r[0].Res_ID,r[0].ResName,r[0].Description,r[0].Location,
        r[0].Availability, r[0].Cost, r[0].TU_ID,r[0].rating, r[0].ResourceType)
      
        return result;
      }
  };
  
  export const getResourcesByFilters = (resources, filters) => {
    return resources.filter((resource) => {
      const { location, cost, availability, type } = filters;
      return (
        (location ? resource.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (cost ? resource.cost.includes(cost) : true) &&
        (availability ? resource.availability === (availability === 'available') : true) &&
        (type ? resource.type === type : true)
      );
    });
  };
  
  export const borrowResource = async (resourceId, startDate, endDate, borrower_id) => {
   
   
    const response=await fetch(SERVER_URL+"/borrows/request", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
        method: "post",
        body: JSON.stringify({resourceId,startDate,endDate,borrower_id})
      });
    return response.json();
  };
  
  export const leaveReview = (resourceId, rating, comment) => {
    // Implement logic to leave a review for a resource
    return Promise.resolve({ id: '3', user: 'New Reviewer', rating, comment });
  };
  
  export const getUserProfile = async (id) => {
    const response=await fetch(SERVER_URL+"/users/profile/"+id);
    if (response.ok){
      const u=await response.json();
      const uP=new User(u.TU_ID, u.Name, u.Email , u.Nickname, u.DoB, 
              u.Address, u.Phone, u.Password, u.UserStatus, u.Roars )
      
      return uP;
    }

    
  };


  export const api_getRatingById = async (id)=>{
    
    const response=await fetch(SERVER_URL+"/ratings/"+id);
    if (response.ok){
      return await response.text();
     
    }
  }

  export const api_addNewResource = async (resource,categories)=>{
   
    resource.addCategories(categories);
    
    
    const response=await fetch(SERVER_URL+"/resources/",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
        method: "post",
        body: JSON.stringify(resource)
      });
      
      return await response.json()
      
    
    
  }
  
  export const updateUserProfile = (updatedUser) => {
    console.log(updatedUser)
    return Promise.resolve(updatedUser);
  };
  
  export const listResource = (newResource) => {
    // Implement logic to list a new resource
    return Promise.resolve({ id: '3', ...newResource });
  };
  
  export const getUsers = () => {
    return Promise.resolve(sampleUsers);
  };
  
  export const suspendUser = (userId) => {
//suspend
    return Promise.resolve();
  };
  
  export const getResources = () => {
    return Promise.resolve([...sampleResources, { id: '3', name: 'Pending Resource', status: 'pending' }]);
  };
  
  export const approveResource = (resourceId) => {
    
    return Promise.resolve();
  };
  
  export const api_deleteResource = async (resourceId) => {
    const response=await fetch(SERVER_URL+"/resources/"+resourceId,{ method: "delete"});
    if (response.ok){
      return await response.json();
      
    }

    
  };

  export const api_getAllBorrowsPendingBYTUID = async (id)=>{
    
    const response=await fetch(SERVER_URL+"/borrows/searchpending/"+id);
    if (response.ok){
      return await response.json();
     
    }
  }
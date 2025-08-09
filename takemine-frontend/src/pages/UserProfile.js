import React, { useState, useEffect, useContext } from 'react';
import { getUserProfile, updateUserProfile, listResource, getAllResources, getResources, api_addNewResource, getResourceByTUID, api_deleteResource } from '../utils/api';
import ResourceMyCard from '../components/ResourceMyCard';
import { useParams } from 'react-router-dom';
import './userProfile.css'
import Resource from '../models/resourse';
import { useAuth } from '../context/Authcontext';
function UserProfile() {
  const [user, setUser] = useState();
  const [resources,setResources]=useState([])
  const [btnUpdate,setBtnUpdate]=useState(false)
  const [categories,setCategories]=useState([])
  const [newResource, setNewResource] = useState(new Resource());
  const [message,setMessage]=useState("")
  const global =useAuth()
  
  const id=global.user.userId;
  
  // Fetch the user's profile when the component mounts
  useEffect(() => {
    
    const fetchUserProfile = async () => {
     
      const u=await getUserProfile(id);
      setUser({...u})
   
      
    };
    const fetchResource = async () => {
     
      const res=await getResourceByTUID(id);
      setResources(res)
   
      
    };
   
    fetchUserProfile();
    fetchResource();
  }, []);

  const handleProfileUpdate = async (e) => {
     
      
      const updatedUser = await updateUserProfile(user);
      //setUser(updatedUser);
      
  };

  const deleteResource=async (id)=>{
         console.log(id)
         await api_deleteResource(id)
         .then(setResources(resources.filter(r=>r.id!=id)))
        
    }
   

  

  const addCategories = (e)=>{
    
   const category=e.target.name;
   if(categories.includes(category))
      setCategories([...categories.filter(c=>c!=category)])
   else
      setCategories([...categories,category])  
    
   
     
  }

  const addNewResource= async() =>{

    if(categories.length==0)
      {
        setMessage("Select one o more categories")
        return
      }  
      
      
    newResource.TU_ID=user.id;

    const message= await api_addNewResource(newResource,categories);
    
    if(message.newId)
    {
      newResource.id=message.newId;
      setResources([...resources,newResource]);
      setNewResource({
        name: '',
        location: '',
        description: '',
        cost: '',
        availability: true,
        type: "Item"
      });
    } 
    setMessage(message.message)
  }

  const handleResourceListing = async () => {
    try {
      const newResourceData = await listResource(newResource);
      setUser((prevUser) => ({
        ...prevUser,
        resources: [...prevUser.resources, newResourceData],
      }));
      setNewResource({
        name: '',
        location: '',
        description: '',
        cost: '',
        availability: true,
      });
    } catch (error) {
      console.error('Error listing resource:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    
    <div className="container mx-auto py-45 px-4 ">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-8" style={{align: "center"}}>
        <form>
          <h3 className="roars"> Your Roars: {user.roars}   
          </h3>

          <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            TU_ID:  {user.id}
          </label>
          
        <br />
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Nickname:  {user.nickname}
          </label>
          
        <br />
          
          <label>
            Name:  {user.name} 
          </label>
          <br />

          <label>
            Em@il:  {user.email} 
          </label>
          <br />
          <label>
            Date of Birth:  {user.dob.substring(0,10)} 
          </label>
          
        </div>
       <h4>Your contacts</h4>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input className="form-control"
            size={50}
            disabled
            type="email"
            id="email"
            value={user.address}
        //    onChange={(e) => setUser({ ...user, email: e.target.value })}
          //  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
          />
        </div>
        <div>
          Phone
          <input 
           
            
            type="text"
            id="phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
          />
        </div>
        
        
        <button
          
          type='button'
          onClick={btnUpdate ? handleProfileUpdate : e =>e.preventDefault()}
          className="bg-dark-orange text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-500"
        >
          Update Profile
        </button>
        </form>
      </div> 
      

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Your Availability Resources</h2>
        <div className="resource-table">
          { resources.map((resource) => (
            <ResourceMyCard key={resource.id} resource={resource} change={()=>deleteResource(resource.id)}/>
          ))} 
        </div>
      </div>
      

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Insert a new Resource</h2>
        <form>
        <div className="bg-white rounded-lg shadow-md p-8">
          
           <div>
           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Type 
            </label>
          <select id="type" name="type" onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}>
            <option value="Item">Item</option>
            <option value="Help">Help</option>
          </select>
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Resourse Name 
            </label>
            <input
            required
               size={50}
              type="text"
              id="name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
             Description 
            </label>
            <input
              required
              size={120}
              type="text"
              id="description"
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Location 
            </label>
            <input
              required
              type="text"
              id="location"
              value={newResource.location}
              onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Cost 
            </label>
            <input
              required
              size={10}
              type="number"
              id="cost"
              value={newResource.cost}
              onChange={(e) => setNewResource({ ...newResource, cost: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
            />
          </div>
         
          <h3 >Categories</h3> 
          <p><small style={{color: "red"}}>{message}</small></p>
          <div className='resource-table' >
          
          Learning <input name="Learning" type="checkbox" style={{marginRight: "10px"}} onChange={addCategories}  />
            
Housing <input name="Housing" type="checkbox" style={{marginRight: "10px"}} onChange={addCategories}/>
Transportation <input name="Transportation"  type="checkbox" style={{marginRight: "10px"}} onChange={addCategories}/>
Electronics <input name="Electronics" type="checkbox" style={{marginRight: "10px"}}  onChange={addCategories}/>
Music <input name="Music" type="checkbox" style={{marginRight: "10px"}} onChange={addCategories}/>
Arts <input name="Arts" type="checkbox" style={{marginRight: "10px"}} onChange={addCategories} />
Sports & Fitness <input name="Sport&Fitness" type="checkbox" style={{marginRight: "10px"}} onChange={addCategories} />
Wellness <input name="Wellness"  type="checkbox" style={{marginRight: "10px"}} onChange={addCategories} />
Food <input name="Food" type="checkbox" onChange={addCategories}/>

          </div>
          {/* Add more form fields for location, description, cost, and availability */}
          <button
            onClick={addNewResource}
            className="bg-dark-orange text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-500"
          >
            Insert Resource 
          </button>
        </div>
        </form>
      </div>
      
    </div>
  );
}

export default UserProfile;
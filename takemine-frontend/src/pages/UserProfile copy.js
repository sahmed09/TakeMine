import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, listResource } from '../utils/api';
import ResourceCard from '../components/ResourceCard';
import { useParams } from 'react-router-dom';
import './Login.css'
function UserProfile() {
  const [user, setUser] = useState();
  const [newResource, setNewResource] = useState({
    name: '',
    location: '',
    description: '',
    cost: '',
    availability: true,
  });
  const id=useParams().id;
  // Fetch the user's profile when the component mounts
  useEffect(() => {
    
    const fetchUserProfile = async () => {
     
      const u=await getUserProfile(id);
      setUser({...u})
      
      
    };
   
    fetchUserProfile();
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      const updatedUser = await updateUserProfile(user);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-8" style={{align: "center"}}>
        <div  >
          
          <label>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
         //   onChange={(e) => setUser({ ...user, name: e.target.value })}
            disabled
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input className="form-control"
           
            disabled
            type="email"
            id="email"
            value={user.email}
        //    onChange={(e) => setUser({ ...user, email: e.target.value })}
          //  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
          />
        </div>
        <button
          onClick={handleProfileUpdate}
          className="bg-dark-orange text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-500"
        >
          Update Profile
        </button>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Your Listed Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
         {/*  {user.resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource}  />
          ))} */}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">List a New Resource</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
            />
          </div>
          {/* Add more form fields for location, description, cost, and availability */}
          <button
            onClick={handleResourceListing}
            className="bg-dark-orange text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-500"
          >
            List Resource
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
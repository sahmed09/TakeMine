import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getResourceById, borrowResource, getUserProfile } from '../utils/api';
import { useAuth } from '../context/Authcontext';
// Your BorrowPage component code...

function BorrowPage() {
  const  {id}  = useParams();
  const [resource, setResource] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState('');
  const [user,setUser]=useState()

  const global=useAuth();
 console.log(global.user)
  // Fetch the resource details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getResourceById(id);
      const user= await getUserProfile(data.TU_ID)
      setResource(data)
      setUser(user)
       };
      
   
    fetchDetails();
   
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
   
     try {
      const res=await borrowResource(id, startDate, endDate,global.user.userId);
      setMessage('Borrow request submitted successfully!');
    } catch (error) {
      setMessage('Error submitting borrow request. Please try again.');
    } 
  };

  if (!resource) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-16 px-4" style={{margin: "20x"}}>
      <div style={{textAlign:"center"}}>
      <h1 className="text-3xl font-bold mb-8" style={{color: "orange"}}>{resource.name}  </h1>
      <h2>Cost: {resource.cost}</h2>
      <h3 className="text-3xl font-bold mb-8">{resource.description}</h3>
      <p className="text-3xl font-bold mb-8">{resource.location}</p>
      </div>
      <p>posted by: {user.nickname} </p> 
      Email: 
         
        <Link
            to='#'
            onClick={(e) => {
                window.location.href = "mailto:"+user.email
                e.preventDefault();
            }}
        >
           {user.email}
        </Link>
          
        
<form>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
            Start Date
          </label>
          <input
          required
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => {setStartDate(e.target.value);setEndDate(e.target.value)}}
            
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
            End Date
          </label>
          <input
          required
            min={startDate}
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-orange"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message (optional)
          </label>
         
        </div>
        <p>{message}</p>
        <button
          onClick={handleBorrow}
          className="bg-dark-orange text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-500"
        >
          Submit Borrow Request
        </button>
      </div>
      </form>
    </div>
  );
}

export default BorrowPage;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import './Header.css';

const Header = () => {
  const { user, login,logout } = useAuth();
  
 
  return (
    <header className="navbar">
      <div className="logo">
       <Link to ="/"> <img src="takewhite.png" alt="TakeMine" className="logo-image" /></Link>
      </div>
      <nav>
        <ul>
        
          <li><Link to="/about">About Us</Link></li>
           {user ? <li>  <Link to="/resources">Search</Link> </li> : <></>
                     }
          {user ? <li><Link to="/availableresource">Sharing</Link></li> : <></>
          }
         
          {user ? (
            <>
              <li><Link to={"/profile"}>Profile</Link></li>
              <li style={{color: "orange"}}>Hi, {user.nickname}</li>
              <li> <Link   onClick={logout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

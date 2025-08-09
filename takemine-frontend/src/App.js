import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResourceList from './pages/ResourceList';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminPage';
import ResourcePage from './pages/ResourcePage';
import BorrowPage from './pages/BorrowPage';
import UserProfile from './pages/UserProfile';
import AdminLogin from './pages/Adminlogin';
import Header from './components/Header';
import About from './pages/Aboutus'
import Footer from './components/Footer'
import Available from './components/ResourceDetails'
import { useAuth } from './context/Authcontext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin');

  const global=useAuth()
  
  return (
    <Router>
    
      {!window.location.pathname.startsWith('/admin') && <Header />}
      
      <div>
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={global.user ? <ResourceList /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resource/:id" element={<ResourcePage />} />
          <Route path="/borrow/:id" element={global.user ? <BorrowPage /> : <Navigate to="/login" />} />
          <Route path="/profile/" element={global.user ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/availableresource" element={<Available/>}/>
          {/* Admin login page */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Admin-only routes */}
          <Route path="/admin-dashboard" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        </Routes>
        
      </div>
      {!window.location.pathname.startsWith('/admin') && <Footer />}
    </Router>
  );
}

export default App;

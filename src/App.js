import React, { useState } from 'react';
import Siderbar from './components/sidebar/Siderbar';
import Topbar from './components/Topbar'
import "./App.css"
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import UserList from './pages/userLists/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import HomelancerList from './pages/homelancerLists/HomelancerList';
import PendingHomelancerList from './pages/pendinHomelancers/PendingHomelancerList';
import LoginPage from './pages/Login/LoginPage';
import Complaint from './pages/complaints/Complaint';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/*" element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function AppLayout() {
  return (
    <>

<div className="container">
  <div className="sidebar">
    <Siderbar />
  </div>
  <div className="content">
    <div className="topbar">
      <Topbar />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/user/:userID" element={<User />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/homelancers" element={<HomelancerList />} />
      <Route path="/pendingHomelancers" element={<PendingHomelancerList />} />
      <Route path='/complaints' element={<Complaint />}  />

    </Routes>
  </div>
</div>
    </>
  );
}

export default App;

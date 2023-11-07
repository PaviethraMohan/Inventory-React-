import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../environment";
import { Link, useNavigate } from 'react-router-dom';
function Navbar({ setAuthenticated }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    //setAuthenticated(false);
    navigate('/');
    
  };
  const handleSidebar=()=>{};
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState(0);
  const authToken = localStorage.getItem('authToken');
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };
  const handleProfile=(userId)=>{
    navigate(`/user-profile/${userId}`);
  }
  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/UsersController/GetUser`, {
        headers: headers,
      })
      .then((response) => {
        setFirstName(response.data.result.firstName);
        setUserId(response.data.result.registerId);
        console.log(response.data.result.registerId);
        console.log(response.data.result.firstName);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <nav className="navbar bg-primary d-flex" data-bs-theme="dark">
      <div className="col-md-6">
        <button
          className="navbar-toggler btn-block bg-primary bg-gradient"
          style={{ color: 'white', border: '2px', borderColor: 'white' }}
          id="sidebarToggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          onClick={handleSidebar}
        >
          ☰
        </button>
        <Link
          to="/dashboard"
          className="navbar-brand"
          style={{
            color: 'antiquewhite',
            fontSize: 'large',
            fontFamily: 'georgia',
            fontSize: '25px',
            fontWeight: 'bolder',
          }}
        >
          INVENTORY
        </Link>
      </div>
      <div className="col-md-6 text-end">
      <Link to={`/user-profile/${userId}`}>
          <button
            type="button"
            className="btn btn-primary bg-gradient"
            style={{
              fontSize: '24px',
              width: '50px',
              height: '50px',
              fontWeight: 'bold',
              marginRight: '10px',
              backgroundColor:'white' ,
              color:'black',
            }}
            onClick={handleProfile}
          >
             {firstName.charAt(0)}
          </button>
          </Link>
        <button
          type="button"
          className="btn btn-primary bg-gradient"
          onClick={handleLogout}
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Logout
          <i className="bi bi-power" style={{ color: 'white' }}></i>
        </button>
      </div>
     
    </nav>
  );
}

export default Navbar;

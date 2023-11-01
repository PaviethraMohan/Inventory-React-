import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ setAuthenticated }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    //setAuthenticated(false);
    navigate('/');
    
  };
  const handleSidebar=()=>{
   
  };

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

// Layout.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, authenticated }) => {
  return (
    <div>
      <div>
        {authenticated && <Navbar />} 
       
      </div>
      <div className="row">
        <div className='col-md-2 p-0 pr-1'>
        {authenticated && <Sidebar />}
        </div>
        <div className={authenticated ? 'col-md-10 ' : 'col-md-12 '}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

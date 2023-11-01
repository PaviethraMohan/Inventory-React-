// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Layout from './Layout/Layout';
import PrivateRoute from './PrivateRoute'; 

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Layout authenticated={authenticated}>
        <Routes>
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute authenticated={authenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Add other protected routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
